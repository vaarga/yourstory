import React, {
    useRef,
    RefObject,
    ReactElement,
    useEffect,
} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { Effect } from '../../../../../../types/typescript/reducers/steps';
import { CanvasCssProperty, DivCssProperty } from '../../../../../../types/typescript/components/ImagePreview';
import { IMAGE_PREVIEW_MAX_DIMENSION, CANVAS_USE_CASE } from '../../../../../../constants/image';
import editAndPutImageData from '../../../../../../utils/image/editAndPutImageData';
import { COLOR } from '../../../../../../constants/theme';
import { EffectPropType } from '../../../../../../types/proptypes/reducers/steps';

const ImagePreview = ({
    imageData,
    effect,
}: {
    imageData: null | ImageData;
    effect: null | Effect;
}): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let cssProperty: CanvasCssProperty | DivCssProperty = {
        width: '100%',
        height: '100%',
        maxWidth: IMAGE_PREVIEW_MAX_DIMENSION.width,
        maxHeight: IMAGE_PREVIEW_MAX_DIMENSION.height,
        aspectRatio: `${IMAGE_PREVIEW_MAX_DIMENSION.width / IMAGE_PREVIEW_MAX_DIMENSION.height}`,
        borderRadius: 1,
    };
    let ref: RefObject<HTMLCanvasElement> | null;
    let component: 'canvas' | 'div';
    let children: string | ReactElement;

    useEffect(() => {
        if (canvasRef.current && imageData) {
            editAndPutImageData(canvasRef.current, CANVAS_USE_CASE.preview, imageData, effect!);
        }
    }, [imageData, effect]);

    if (imageData?.data) {
        ref = canvasRef;
        component = 'canvas';
        children = 'Image preview (update your browser in order to be able to see it).';
    } else {
        cssProperty = {
            ...cssProperty,
            p: 5,
            backgroundColor: 'primary.main',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
        };
        ref = null;
        component = 'div';
        children = (
            <Typography sx={{ color: COLOR.whiteLight }} variant="h4">
                Upload or select an image to see its preview
            </Typography>
        );
    }

    return (
        <Box sx={cssProperty} ref={ref} component={component}>
            { children }
        </Box>
    );
};

ImagePreview.propTypes = {
    imageData: PropTypes.instanceOf(ImageData),
    effect: EffectPropType,
};

ImagePreview.defaultProps = {
    imageData: null,
    effect: null,
};

export default ImagePreview;
