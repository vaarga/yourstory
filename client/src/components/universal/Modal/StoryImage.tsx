import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { State } from '../../../store';

const StoryImage = (): JSX.Element => {
    const {
        stories: { stories },
        ui: { modal: { isGettingImage } },
        universal: { modal: { auxData: { storyIndex, imageIndex } } },
    } = useSelector((state: State) => state);
    const { spacing } = useTheme();
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number}>({
        width: 0,
        height: 0,
    });
    const { resizedImages } = stories[storyIndex];

    let imageBase64;

    if (resizedImages) {
        imageBase64 = resizedImages[imageIndex as keyof typeof resizedImages];

        if (imageBase64 && !imageDimensions.width) {
            const imageElement = new Image();

            imageElement.src = imageBase64;
            imageElement.onload = () => {
                setImageDimensions({
                    width: imageElement.width,
                    height: imageElement.height,
                });
            };
        }
    }

    if (isGettingImage) {
        return <CircularProgress />;
    }

    return (
        <Box
            sx={{
                // spacing(3) because the modal padding is 3
                maxWidth: `calc(100vw - ${parseInt(spacing(3), 10) * 2}px)`,
                maxHeight: `calc(100vh - ${parseInt(spacing(3), 10) * 2}px)`,
                borderRadius: 2,
            }}
            component="img"
            src={imageBase64}
        />
    );
};

export default StoryImage;
