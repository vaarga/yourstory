import { Image } from '../../types/typescript/reducers/steps';
import { CANVAS_USE_CASE, STORY_IMAGE_FILE_EXTENSION, STORY_IMAGE_MIME_TYPE } from '../../constants/image';
import editAndPutImageData from './editAndPutImageData';

export default (
    images: Image[],
    canvasUseCase: CANVAS_USE_CASE.thumbnail | CANVAS_USE_CASE.resized,
) => images.map((image, index) => new Promise<Blob>(
    (resolve) => {
        const canvas = document.createElement('canvas');
        const thumbnailCanvasUseCase = canvasUseCase === CANVAS_USE_CASE.thumbnail;

        editAndPutImageData(
            canvas,
            canvasUseCase,
            thumbnailCanvasUseCase ? image.data.thumbnail! : image.data.resized!,
            image.effect
        );

        canvas.toBlob((blob) => {
            const fileNameEnding = thumbnailCanvasUseCase ? '_t' : '';
            const fileName = `${index + 1}${fileNameEnding}.${STORY_IMAGE_FILE_EXTENSION}`;

            const file = new File(
                [blob!],
                fileName,
                { type: STORY_IMAGE_MIME_TYPE }
            );

            resolve(file);
        }, STORY_IMAGE_MIME_TYPE);
    }
));
