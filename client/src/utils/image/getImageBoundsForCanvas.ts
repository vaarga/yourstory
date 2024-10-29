import { CANVAS_USE_CASE, IMAGE_PREVIEW_MAX_DIMENSION } from '../../constants/image';

// Depending on the image dimensions, the canvas dimensions and the canvas use case calculate the image bounds (x, y,
// width and height)
export default (
    imageWidth: number,
    imageHeight: number,
    canvasWidth: number,
    canvasHeight: number,
    canvasUseCase: CANVAS_USE_CASE,
) => {
    let width: number;
    let height: number;
    let chooseRatioForScaling: (typeof Math.max | typeof Math.min);

    // If both width and height are smaller than the preview dimensions (for thumbnail it's restricted to upload a
    // smaller image than its dimensions) we don't want to scale up the image
    if (
        canvasUseCase === CANVAS_USE_CASE.preview
        && imageWidth < IMAGE_PREVIEW_MAX_DIMENSION.width
        && imageHeight < IMAGE_PREVIEW_MAX_DIMENSION.height
    ) {
        width = imageWidth;
        height = imageHeight;
    } else {
        const widthRatio = canvasWidth / imageWidth;
        const heightRatio = canvasHeight / imageHeight;

        // If the bigger ratio is chosen for scaling it will produce the "object-fit: cover;" effect
        if (canvasUseCase === CANVAS_USE_CASE.thumbnail) {
            chooseRatioForScaling = Math.max;
        } else {
            // It's a preview or a resized use case
            // If the smaller ratio is chosen for scaling it will produce the "object-fit: contain;" effect
            chooseRatioForScaling = Math.min;
        }

        const scale = chooseRatioForScaling(widthRatio, heightRatio);

        width = imageWidth * scale;
        height = imageHeight * scale;
    }

    let x: number;
    let y: number;

    // If the image is only being resized don't move from its original (0, 0) position
    if (canvasUseCase === CANVAS_USE_CASE.resized) {
        x = 0;
        y = 0;
    } else {
        x = (canvasWidth - width) / 2;
        y = (canvasHeight - height) / 2;
    }

    return {
        x,
        y,
        width,
        height,
    };
};
