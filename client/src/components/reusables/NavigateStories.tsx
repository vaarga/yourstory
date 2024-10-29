import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import PropTypes from 'prop-types';
import Story from './Story';
import Paper from './Paper';
import { useAppDispatch, State } from '../../store';
import { getStories } from '../../store/stories/stories-actions';
import { storiesAction } from '../../store/stories/stories-slice';

const NavigateStories = ({ myStories }: { myStories: boolean }): JSX.Element => {
    const appDispatch = useAppDispatch();
    const {
        ui: { isGettingStories },
        stories: { currentIndex, stories, isAllStoriesLoaded },
    } = useSelector((state: State) => state);
    const noStories = stories.length === 0 && !isGettingStories;
    const isGettingFirstStories = stories.length === 0 && isGettingStories;
    const isLastStory = stories.length - 1 === currentIndex;
    const isGettingNextStory = isLastStory && isGettingStories;

    useEffect(() => {
        appDispatch(getStories(myStories));

        return () => {
            appDispatch(storiesAction.setCurrentIndex(0));
            appDispatch(storiesAction.setStories([]));
            appDispatch(storiesAction.setIsAllStoriesLoaded(false));
        };
    }, []);

    const handlePreviousStory = () => {
        appDispatch(storiesAction.setCurrentIndex(currentIndex - 1));
    };

    const handleNextStory = () => {
        if (!isLastStory) {
            appDispatch(storiesAction.setCurrentIndex(currentIndex + 1));
        } else {
            appDispatch(getStories(myStories));
        }
    };

    const getPaperChildren = () => {
        if (noStories) {
            return (
                <Typography
                    variant="h3"
                    sx={{
                        width: 'fit-content',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        p: 5,
                    }}
                >
                    There are no stories to show
                </Typography>
            );
        }

        if (stories[currentIndex]) {
            return (
                <Story
                    story={stories[currentIndex]}
                    index={currentIndex}
                    myStories={myStories}
                />
            );
        }

        return null;
    };

    return (
        <Paper
            isLoading={isGettingFirstStories}
            footer={(
                <>
                    <Button disabled={currentIndex === 0} onClick={handlePreviousStory}>
                        Previous
                    </Button>
                    <LoadingButton
                        disabled={noStories || isGettingNextStory || (isAllStoriesLoaded && isLastStory)}
                        loading={isGettingNextStory}
                        onClick={handleNextStory}
                    >
                        Next
                    </LoadingButton>
                </>
            )}
        >
            { getPaperChildren() }
        </Paper>
    );
};

NavigateStories.propTypes = {
    myStories: PropTypes.bool,
};

NavigateStories.defaultProps = {
    myStories: false,
};

export default NavigateStories;
