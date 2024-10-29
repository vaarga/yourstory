import { CANVAS_USE_CASE, IMAGE_THUMBNAIL_MAX_DIMENSION, IMAGE_PREVIEW_MAX_DIMENSION } from '../../constants/image';
import { Effect } from '../../types/typescript/reducers/steps';
import { SWITCH_DEFAULT_ERROR_MESSAGE } from '../../constants/error';
import { StoryImage } from '../../classes/StoryImage';

// Add effects to the image and put it on the HTML canvas element
export default (
    canvas: HTMLCanvasElement,
    canvasUseCase: CANVAS_USE_CASE,
    imageData: ImageData,
    effect: Effect,
) => {
    /* eslint-disable no-param-reassign */
    let dirtyWidth;
    let dirtyHeight;

    switch (canvasUseCase) {
        case CANVAS_USE_CASE.thumbnail:
            canvas.width = IMAGE_THUMBNAIL_MAX_DIMENSION.width;
            canvas.height = IMAGE_THUMBNAIL_MAX_DIMENSION.height;

            dirtyWidth = IMAGE_THUMBNAIL_MAX_DIMENSION.width;
            dirtyHeight = IMAGE_THUMBNAIL_MAX_DIMENSION.height;
            break;
        case CANVAS_USE_CASE.preview:
            canvas.width = IMAGE_PREVIEW_MAX_DIMENSION.width;
            canvas.height = IMAGE_PREVIEW_MAX_DIMENSION.height;

            dirtyWidth = IMAGE_PREVIEW_MAX_DIMENSION.width;
            dirtyHeight = IMAGE_PREVIEW_MAX_DIMENSION.height;
            break;
        case CANVAS_USE_CASE.resized:
            canvas.width = imageData.width;
            canvas.height = imageData.height;

            dirtyWidth = imageData.width;
            dirtyHeight = imageData.height;
            break;
        default:
            throw new Error(SWITCH_DEFAULT_ERROR_MESSAGE);
    }

    const imageDataClone = new ImageData(
        new Uint8ClampedArray(imageData.data),
        imageData.width,
        imageData.height,
    );

    const storyImage = new StoryImage(imageDataClone, effect);

    storyImage.applyAllEffects();

    const context = canvas.getContext('2d')!;

    context.putImageData(storyImage.imageData, 0, 0, 0, 0, dirtyWidth, dirtyHeight);
    /* eslint-enable no-param-reassign */
};
