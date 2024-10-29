import { StoryImage } from '../../../classes/StoryImage';
import { STEP_INDEX, STEPS_ACTION_TYPE } from '../../../reducers/steps';
import { STORY_CATEGORY } from '../../../constants/story';

export type Effect = typeof StoryImage.EFFECT_DEFAULT_VALUE;

export type Image = {
    data: {
        thumbnail: null | ImageData;
        preview: null | ImageData;
        resized: null | ImageData;
    };
    effect: Effect;
};

export type Images = {
    '0': Image;
    '1': Image;
    '2': Image;
};

type IsCompleted = boolean;
export type ImageIndex = keyof Images;
export type SelectedImageIndex = null | ImageIndex;

export type Steps = {
    [STEP_INDEX.WRITE_TITLE_AND_CONTENT]: {
        isCompleted: IsCompleted;
        title: string;
        content: string;
    };
    [STEP_INDEX.UPLOAD_IMAGES]: {
        isCompleted: IsCompleted;
        selectedImageIndex: SelectedImageIndex;
        images: Images;
    };
    [STEP_INDEX.CHOOSE_CATEGORY]: {
        isCompleted: IsCompleted;
        category: null | STORY_CATEGORY;
    };
};

// Because the "EFFECT" enum it's a static property of a class the "StoryImage.EFFECT" can't be used directly as a
// type, so we need to do this workaround
export type EFFECT = typeof StoryImage.EFFECT[keyof typeof StoryImage.EFFECT];

export type Action = {
    type: STEPS_ACTION_TYPE.setIsCompleted;
    stepIndex: keyof Steps;
    isCompleted: IsCompleted;
} | {
    type: STEPS_ACTION_TYPE.setTitle;
    title: string;
} | {
    type: STEPS_ACTION_TYPE.setContent;
    content: string;
} | {
    type: STEPS_ACTION_TYPE.setSelectedImageIndex;
    selectedImageIndex: SelectedImageIndex;
} | {
    type: STEPS_ACTION_TYPE.setImageData;
    imageIndex: ImageIndex;
    thumbnail: Image['data']['thumbnail'];
    preview: Image['data']['preview'];
    resized: Image['data']['resized'];
} | {
    type: STEPS_ACTION_TYPE.setImageEffect;
    effect: EFFECT;
    value: Effect[keyof Effect];
} | {
    type: STEPS_ACTION_TYPE.resetImage;
    imageIndex: ImageIndex;
} | {
    type: STEPS_ACTION_TYPE.resetImageEffects;
} | {
    type: STEPS_ACTION_TYPE.setCategory;
    category: STORY_CATEGORY;
};
