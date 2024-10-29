import React from 'react';
import { useSelector } from 'react-redux';
import SvgIcon from '@mui/material/SvgIcon';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NoAccountsRoundedIcon from '@mui/icons-material/NoAccountsRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PropTypes from 'prop-types';
import { Story as StoryType } from '../../types/typescript';
import { useAppDispatch, State } from '../../store';
import { GOOGLE_PHOTO_DIMENSION } from '../../constants/image';
import { isAuthor } from '../../types/typescript/typeGuards';
import { getStoryImage, heartOrUnheartStory } from '../../store/stories/stories-actions';
import { universalAction } from '../../store/universal/universal-slice';
import { MODAL_TYPE } from '../../constants/modal';
import formatEnumElementToLabelText from '../../utils/formatEnumElementToLabelText';
import { STORY_CATEGORY } from '../../constants/story';

const Story = ({
    story,
    index,
    myStories,
}: {
    story: StoryType;
    index: number;
    myStories: boolean;
}): JSX.Element => {
    const appDispatch = useAppDispatch();
    const { isAdmin } = useSelector((state: State) => state.user);

    let name = 'Anonymous';
    let photo = (
        <SvgIcon
            sx={{ fontSize: GOOGLE_PHOTO_DIMENSION }}
            component={AccountCircleRoundedIcon}
            viewBox="2 2 20 20"
        />
    );

    if (story.author && isAuthor(story.author)) {
        name = story.author.name;

        if (story.author.photo) {
            photo = (
                <Avatar
                    sx={{
                        width: GOOGLE_PHOTO_DIMENSION,
                        height: GOOGLE_PHOTO_DIMENSION,
                    }}
                    alt={name}
                    src={story.author.photo}
                />
            );
        }
    }

    const handleOpenResizedImage = (imageIndex: number) => {
        if (
            story.resizedImages === undefined
            || story.resizedImages[imageIndex as keyof typeof story.resizedImages] === undefined
        ) {
            appDispatch(getStoryImage(index, story.uuid, imageIndex));
        }

        appDispatch(universalAction.setModal({
            type: MODAL_TYPE.STORY_IMAGE,
            auxData: { storyIndex: index, imageIndex },
        }));
    };

    const thumbnailImages = story.images.map((image, imageIndex) => (
        <Box key={image} sx={{ maxWidth: GOOGLE_PHOTO_DIMENSION, maxHeight: GOOGLE_PHOTO_DIMENSION }}>
            <Box
                sx={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    borderRadius: 1,
                    cursor: 'pointer',
                }}
                src={image}
                component="img"
                onClick={() => handleOpenResizedImage(imageIndex)}
            />
        </Box>
    ));

    const handleHeartOrUnheartStory = (event: React.ChangeEvent<HTMLInputElement>) => {
        appDispatch(heartOrUnheartStory(index, story.uuid, event.target.checked));
    };

    const handleBanUser = () => {
        appDispatch(universalAction.setModal({
            type: MODAL_TYPE.USER_DELETION,
            auxData: { authorUuid: story.author!.uuid },
        }));
    };

    const handleDeleteStory = () => {
        appDispatch(universalAction.setModal({
            type: MODAL_TYPE.STORY_DELETION,
            auxData: { storyIndex: index, storyUuid: story.uuid },
        }));
    };

    return (
        <Stack sx={{ pb: 5 }}>
            <article>
                <Stack
                    flexDirection="row"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    gap={2}
                >
                    <Stack flexDirection="row" gap={2}>
                        { photo }
                        <Stack justifyContent="space-between">
                            <Typography variant="h4"> { story.title } </Typography>
                            <Typography> { formatEnumElementToLabelText(story.category) } </Typography>
                            <Typography> { name } </Typography>
                        </Stack>
                    </Stack>
                    <Stack flexDirection="row" gap={2}>
                        { thumbnailImages }
                    </Stack>
                </Stack>
                <Typography
                    sx={{
                        mt: 3,
                        mb: 2,
                        height: '447px',
                        whiteSpace: 'break-spaces',
                        overflowY: 'auto',
                    }}
                >
                    { story.content }
                </Typography>
            </article>
            <Stack flexDirection="row" justifyContent="space-between">
                <Stack flexDirection="row" gap={1}>
                    <Checkbox
                        checked={story.isHearted}
                        color="heart"
                        inputProps={{ 'aria-label': 'heart or unheart story' }}
                        icon={<FavoriteBorderRoundedIcon />}
                        checkedIcon={<FavoriteRoundedIcon />}
                        onChange={handleHeartOrUnheartStory}
                    />
                    <Stack justifyContent="center">
                        <Typography>
                            { story.heartsNr } hearts
                        </Typography>
                    </Stack>
                </Stack>
                <Stack flexDirection="row" gap={1}>
                    {
                        (!myStories && isAdmin) && (
                            <Tooltip title="Ban user">
                                <IconButton
                                    aria-label="ban user"
                                    component="label"
                                    onClick={handleBanUser}
                                >
                                    <NoAccountsRoundedIcon />
                                </IconButton>
                            </Tooltip>
                        )
                    }
                    {
                        (myStories || isAdmin) && (
                            <Tooltip title="Delete story">
                                <IconButton
                                    aria-label="delete story"
                                    component="label"
                                    onClick={handleDeleteStory}
                                >
                                    <DeleteRoundedIcon />
                                </IconButton>
                            </Tooltip>
                        )
                    }
                </Stack>
            </Stack>
        </Stack>
    );
};

Story.propTypes = {
    story: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.oneOf([
            STORY_CATEGORY.ACTION,
            STORY_CATEGORY.COMEDY,
            STORY_CATEGORY.MYSTERY,
            STORY_CATEGORY.FANTASY,
            STORY_CATEGORY.HORROR,
            STORY_CATEGORY.SCIENCE_FICTION,
            STORY_CATEGORY.ROMANCE,
        ]).isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        isHearted: PropTypes.bool.isRequired,
        heartsNr: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        resizedImages: PropTypes.shape({
            1: PropTypes.string,
            2: PropTypes.string,
            3: PropTypes.string,
        }),
        author: PropTypes.oneOfType([
            PropTypes.shape({
                uuid: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                photo: PropTypes.string,
            }).isRequired,
            PropTypes.shape({
                uuid: PropTypes.string.isRequired,
            }).isRequired,
        ]),
    }).isRequired,
    index: PropTypes.number.isRequired,
    myStories: PropTypes.bool.isRequired,
};

export default Story;
