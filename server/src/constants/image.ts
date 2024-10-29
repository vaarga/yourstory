// Pixels
export const IMAGE_RESIZED_MAX_DIMENSION = {
    width: 1000,
    height: 800,
};

export const STORY_IMAGE_FILE_EXTENSION = 'png';

export const STORY_IMAGE_MIME_TYPE = 'image/png';

// The reason 4 is used is that RGBA will be (typically) represented as 32-bits (hence 4 bytes)
export const STORY_IMAGE_MAX_FILE_SIZE = IMAGE_RESIZED_MAX_DIMENSION.width * IMAGE_RESIZED_MAX_DIMENSION.height * 4;

export const FAVICON_IMAGE_FILE_EXTENSION = 'ico';

export const FAVICON_IMAGE_MIME_TYPE = 'image/x-icon';
