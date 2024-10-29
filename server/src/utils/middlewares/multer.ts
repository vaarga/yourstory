import multer, { memoryStorage, FileFilterCallback } from 'multer';
import { Request } from 'express';
import { STORY_IMAGE_MIME_TYPE, STORY_IMAGE_MAX_FILE_SIZE } from '../../constants/image';
import { STORY_MAX } from '../../constants/story';

const multerStorage = memoryStorage();

const multerFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === STORY_IMAGE_MIME_TYPE) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: multerStorage,
    limits: {
        // Multiplied by 2 because every image has a thumbnail too
        files: STORY_MAX.imagesNr * 2,
        fileSize: STORY_IMAGE_MAX_FILE_SIZE,
    },
    fileFilter: multerFilter,
});

export default upload.array('images');
