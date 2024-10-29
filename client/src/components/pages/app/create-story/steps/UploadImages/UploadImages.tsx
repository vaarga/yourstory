import React, { Dispatch, useEffect } from 'react';
import { useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import ImagePreview from './ImagePreview';
import ImageThumbnail from './ImageThumbnail';
import EffectControllers from './EffectControllers';
import {
    SelectedImageIndex,
    Images,
    Action,
    ImageIndex,
} from '../../../../../../types/typescript/reducers/steps';
import { STORY_MAX } from '../../../../../../constants/story';
import { IMAGE_THUMBNAIL_MAX_DIMENSION } from '../../../../../../constants/image';
import { STEPS_ACTION_TYPE, STEP_INDEX } from '../../../../../../reducers/steps';
import { ImagesPropType } from '../../../../../../types/proptypes/reducers/steps';

const UploadImages = ({
    selectedImageIndex,
    images,
    isCompleted,
    dispatch,
}: {
    selectedImageIndex: SelectedImageIndex;
    images: Images;
    isCompleted: boolean;
    dispatch: Dispatch<Action>;
}): JSX.Element => {
    const { spacing } = useTheme();
    const imageThumbnailsAndControllersMaxWidth = (STORY_MAX.imagesNr * IMAGE_THUMBNAIL_MAX_DIMENSION.width)
        // The spacing between the image thumbnails
        + parseInt(spacing(2), 10) * (STORY_MAX.imagesNr - 1);

    // Uploading images is an optional step, so after the component is mounted (to make sure the user saw this step too)
    // it can be set as completed
    useEffect(() => {
        if (!isCompleted) {
            dispatch({
                type: STEPS_ACTION_TYPE.setIsCompleted,
                stepIndex: STEP_INDEX.UPLOAD_IMAGES,
                isCompleted: true,
            });
        }
    }, [dispatch, isCompleted]);

    return (
        <Stack
            sx={{ py: 5 }}
            flexDirection="row"
            justifyContent="center"
            flexWrap="wrap"
            flexGrow={1}
            gap={4}
        >
            <ImagePreview
                imageData={selectedImageIndex !== null ? images[selectedImageIndex].data.preview : null}
                effect={selectedImageIndex !== null ? images[selectedImageIndex].effect : null}
            />
            <Stack
                sx={{ maxWidth: `${imageThumbnailsAndControllersMaxWidth}px` }}
                justifyContent="space-between"
                gap={3}
            >
                <Stack flexDirection="row" gap={2}>
                    {
                        Object.entries(images).map(([key, image]) => (
                            <ImageThumbnail
                                key={key}
                                imageIndex={key as ImageIndex}
                                imageData={image.data.thumbnail}
                                effect={image.effect}
                                isSelected={selectedImageIndex === key}
                                dispatch={dispatch}
                            />
                        ))
                    }
                </Stack>
                <EffectControllers
                    effect={selectedImageIndex !== null ? images[selectedImageIndex].effect : null}
                    dispatch={dispatch}
                />
            </Stack>
        </Stack>
    );
};

UploadImages.propTypes = {
    selectedImageIndex: PropTypes.string,
    images: ImagesPropType.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};

UploadImages.defaultProps = {
    selectedImageIndex: null,
};

export default UploadImages;
