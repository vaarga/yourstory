import {
    CANVAS_USE_CASE,
    IMAGE_THUMBNAIL_MAX_DIMENSION,
    IMAGE_PREVIEW_MAX_DIMENSION,
    IMAGE_RESIZED_MAX_DIMENSION,
} from '../../constants/image';
import { SWITCH_DEFAULT_ERROR_MESSAGE } from '../../constants/error';
import getImageBoundsForCanvas from './getImageBoundsForCanvas';

// Create a temporary HTML canvas element, draw the image on it (with the desired bounds, depending on the canvas use
// case) and then get the ImageData from it
export default (image: HTMLImageElement, canvasUseCase: CANVAS_USE_CASE) => {
    const canvas = document.createElement('canvas');

    switch (canvasUseCase) {
        case CANVAS_USE_CASE.thumbnail:
            canvas.width = IMAGE_THUMBNAIL_MAX_DIMENSION.width;
            canvas.height = IMAGE_THUMBNAIL_MAX_DIMENSION.height;
            break;
        case CANVAS_USE_CASE.preview:
            canvas.width = IMAGE_PREVIEW_MAX_DIMENSION.width;
            canvas.height = IMAGE_PREVIEW_MAX_DIMENSION.height;
            break;
        case CANVAS_USE_CASE.resized:
            if (image.width > IMAGE_RESIZED_MAX_DIMENSION.width || image.height > IMAGE_RESIZED_MAX_DIMENSION.height) {
                canvas.width = IMAGE_RESIZED_MAX_DIMENSION.width;
                canvas.height = IMAGE_RESIZED_MAX_DIMENSION.height;
            } else {
                canvas.width = image.width;
                canvas.height = image.height;
            }

            break;
        default:
            throw new Error(SWITCH_DEFAULT_ERROR_MESSAGE);
    }

    const {
        width,
        height,
        x,
        y,
    } = getImageBoundsForCanvas(image.width, image.height, canvas.width, canvas.height, canvasUseCase);

    const context = canvas.getContext('2d')!;

    context.drawImage(image, 0, 0, image.width, image.height, x, y, width, height);

    let sw: number;
    let sh: number;

    // If the image is only being resized use the resized image dimensions
    if (canvasUseCase === CANVAS_USE_CASE.resized) {
        sw = width;
        sh = height;
    } else {
        sw = canvas.width;
        sh = canvas.height;
    }

    return context.getImageData(0, 0, sw, sh);
};
