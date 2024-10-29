import React, {
    Dispatch,
    useRef,
    ReactElement,
    useEffect,
    ChangeEvent,
} from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import PropTypes from 'prop-types';
import { ImageIndex, Effect, Action } from '../../../../../../types/typescript/reducers/steps';
import { useAppDispatch } from '../../../../../../store';
import {
    DefaultCssProperty,
    CanvasContainerCssProperty,
    IconButtonContainerCssProperty,
} from '../../../../../../types/typescript/components/ImageThumbnail';
import { IMAGE_THUMBNAIL_MAX_DIMENSION, CANVAS_USE_CASE } from '../../../../../../constants/image';
import editAndPutImageData from '../../../../../../utils/image/editAndPutImageData';
import { STEPS_ACTION_TYPE } from '../../../../../../reducers/steps';
import showNotification from '../../../../../../utils/notification/showNotification';
import { NOTIFICATION_SEVERITY } from '../../../../../../constants/notification';
import getImageData from '../../../../../../utils/image/getImageData';
import { COLOR } from '../../../../../../constants/theme';
import { EffectPropType } from '../../../../../../types/proptypes/reducers/steps';

const ImageThumbnail = ({
    imageIndex,
    imageData,
    effect,
    isSelected,
    dispatch,
}: {
    imageIndex: ImageIndex;
    imageData: null | ImageData;
    effect: Effect;
    isSelected: boolean;
    dispatch: Dispatch<Action>;
}): JSX.Element => {
    const appDispatch = useAppDispatch();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    let cssProperty: DefaultCssProperty | CanvasContainerCssProperty | IconButtonContainerCssProperty = {
        flex: 1,
        aspectRatio: `${IMAGE_THUMBNAIL_MAX_DIMENSION.width / IMAGE_THUMBNAIL_MAX_DIMENSION.height}`,
        display: 'flex',
    };
    let children: ReactElement;

    useEffect(() => {
        if (canvasRef.current && imageData) {
            editAndPutImageData(canvasRef.current, CANVAS_USE_CASE.thumbnail, imageData, effect);
        }
    }, [imageData, effect]);

    const handleImageSelect = () => {
        if (!isSelected) {
            dispatch({
                type: STEPS_ACTION_TYPE.setSelectedImageIndex,
                selectedImageIndex: imageIndex,
            });
        }
    };

    const handleImageClear = () => {
        dispatch({
            type: STEPS_ACTION_TYPE.resetImage,
            imageIndex,
        });

        if (isSelected) {
            dispatch({
                type: STEPS_ACTION_TYPE.setSelectedImageIndex,
                selectedImageIndex: null,
            });
        }
    };

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const imageElement = new Image();

            imageElement.src = URL.createObjectURL(event.target.files[0]);
            imageElement.onload = () => {
                URL.revokeObjectURL(imageElement.src);

                if (
                    imageElement.height < IMAGE_THUMBNAIL_MAX_DIMENSION.height
                    || imageElement.width < IMAGE_THUMBNAIL_MAX_DIMENSION.width
                ) {
                    // If the user tries to upload the same (erroneous) image again nothing will happen because the
                    // input's value remains the same, so the 'onChange' (this) function won't be executed, in order to
                    // fix this bug we must set the value to an empty string
                    inputRef.current!.value = '';

                    const message = `The image must have at least a ${IMAGE_THUMBNAIL_MAX_DIMENSION.width}px ` +
                        `width and a ${IMAGE_THUMBNAIL_MAX_DIMENSION.height}px height.`;

                    showNotification(
                        appDispatch,
                        NOTIFICATION_SEVERITY.error,
                        message
                    );
                } else {
                    dispatch({
                        type: STEPS_ACTION_TYPE.setImageData,
                        imageIndex,
                        thumbnail: getImageData(imageElement, CANVAS_USE_CASE.thumbnail),
                        preview: getImageData(imageElement, CANVAS_USE_CASE.preview),
                        resized: getImageData(imageElement, CANVAS_USE_CASE.resized),
                    });

                    handleImageSelect();
                }
            };
        }
    };

    if (imageData) {
        cssProperty = {
            ...cssProperty,
            position: 'relative',
        };
        children = (
            <>
                <Box
                    sx={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        cursor: 'pointer',
                        boxShadow: isSelected ? '0 0 0 2px' : 'none',
                        color: 'secondary.main',
                        borderRadius: 1,
                    }}
                    ref={canvasRef}
                    component="canvas"
                    onClick={handleImageSelect}
                >
                    Image thumbnail (update your browser in order to be able to see it).
                </Box>
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                    aria-label="clear image"
                    component="label"
                    onClick={handleImageClear}
                >
                    <ClearRoundedIcon />
                </IconButton>
            </>
        );
    } else {
        cssProperty = {
            ...cssProperty,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'primary.main',
            borderRadius: 1,
        };
        children = (
            <IconButton aria-label="add image" component="label">
                <AddAPhotoRoundedIcon sx={{ fontSize: 40, color: COLOR.white }} />
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileSelect}
                />
            </IconButton>
        );
    }

    return (
        <Box sx={cssProperty}>
            { children }
        </Box>
    );
};

ImageThumbnail.propTypes = {
    imageIndex: PropTypes.string.isRequired,
    imageData: PropTypes.instanceOf(ImageData),
    effect: EffectPropType.isRequired,
    isSelected: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};

ImageThumbnail.defaultProps = {
    imageData: null,
};

export default ImageThumbnail;
