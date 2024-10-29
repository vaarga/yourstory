import { StoryImage } from '../classes/StoryImage';
import { Steps, Action } from '../types/typescript/reducers/steps';
import { SWITCH_DEFAULT_ERROR_MESSAGE } from '../constants/error';

const imageInitialState = {
    data: {
        thumbnail: null,
        preview: null,
        resized: null,
    },
    effect: StoryImage.EFFECT_DEFAULT_VALUE,
};

// Represents the order of the steps
export enum STEP_INDEX {
    WRITE_TITLE_AND_CONTENT,
    UPLOAD_IMAGES,
    CHOOSE_CATEGORY,
}

export const stepsInitialState: Steps = {
    [STEP_INDEX.WRITE_TITLE_AND_CONTENT]: {
        isCompleted: false,
        title: '',
        content: '',
    },
    [STEP_INDEX.UPLOAD_IMAGES]: {
        isCompleted: false,
        selectedImageIndex: null,
        images: {
            0: imageInitialState,
            1: imageInitialState,
            2: imageInitialState,
        },
    },
    [STEP_INDEX.CHOOSE_CATEGORY]: {
        isCompleted: false,
        category: null,
    },
};

export enum STEPS_ACTION_TYPE {
    setIsCompleted = 'SET_IS_COMPLETED',
    setTitle = 'SET_TITLE',
    setContent = 'SET_CONTENT',
    setSelectedImageIndex = 'SET_SELECTED_IMAGE_INDEX',
    setImageData = 'SET_IMAGE_DATA',
    setImageEffect = 'SET_IMAGE_EFFECT',
    resetImage = 'RESET_IMAGE',
    resetImageEffects = 'RESET_IMAGE_EFFECTS',
    setCategory = 'SET_CATEGORY',
}

export const stepsReducer = (state: Steps, action: Action): Steps => {
    switch (action.type) {
        case STEPS_ACTION_TYPE.setIsCompleted:
            return ({
                ...state,
                [action.stepIndex]: {
                    ...state[action.stepIndex],
                    isCompleted: action.isCompleted,
                },
            });
        case STEPS_ACTION_TYPE.setTitle:
            return ({
                ...state,
                [STEP_INDEX.WRITE_TITLE_AND_CONTENT]: {
                    ...state[STEP_INDEX.WRITE_TITLE_AND_CONTENT],
                    title: action.title,
                },
            });
        case STEPS_ACTION_TYPE.setContent:
            return ({
                ...state,
                [STEP_INDEX.WRITE_TITLE_AND_CONTENT]: {
                    ...state[STEP_INDEX.WRITE_TITLE_AND_CONTENT],
                    content: action.content,
                },
            });
        case STEPS_ACTION_TYPE.setSelectedImageIndex:
            return ({
                ...state,
                [STEP_INDEX.UPLOAD_IMAGES]: {
                    ...state[STEP_INDEX.UPLOAD_IMAGES],
                    selectedImageIndex: action.selectedImageIndex,
                },
            });
        case STEPS_ACTION_TYPE.setImageData:
            return ({
                ...state,
                [STEP_INDEX.UPLOAD_IMAGES]: {
                    ...state[STEP_INDEX.UPLOAD_IMAGES],
                    images: {
                        ...state[STEP_INDEX.UPLOAD_IMAGES].images,
                        [action.imageIndex]: {
                            ...state[STEP_INDEX.UPLOAD_IMAGES].images[action.imageIndex],
                            data: {
                                thumbnail: action.thumbnail,
                                preview: action.preview,
                                resized: action.resized,
                            },
                        },
                    },
                },
            });
        case STEPS_ACTION_TYPE.setImageEffect: {
            const { selectedImageIndex } = state[STEP_INDEX.UPLOAD_IMAGES];

            return ({
                ...state,
                [STEP_INDEX.UPLOAD_IMAGES]: {
                    ...state[STEP_INDEX.UPLOAD_IMAGES],
                    images: {
                        ...state[STEP_INDEX.UPLOAD_IMAGES].images,
                        [selectedImageIndex!]: {
                            ...state[STEP_INDEX.UPLOAD_IMAGES].images[selectedImageIndex!],
                            effect: {
                                ...state[STEP_INDEX.UPLOAD_IMAGES].images[selectedImageIndex!].effect,
                                [action.effect]: action.value,
                            },
                        },
                    },
                },
            });
        }
        case STEPS_ACTION_TYPE.resetImage:
            return ({
                ...state,
                [STEP_INDEX.UPLOAD_IMAGES]: {
                    ...state[STEP_INDEX.UPLOAD_IMAGES],
                    images: {
                        ...state[STEP_INDEX.UPLOAD_IMAGES].images,
                        [action.imageIndex]: imageInitialState,
                    },
                },
            });
        case STEPS_ACTION_TYPE.resetImageEffects: {
            const { selectedImageIndex } = state[STEP_INDEX.UPLOAD_IMAGES];

            return ({
                ...state,
                [STEP_INDEX.UPLOAD_IMAGES]: {
                    ...state[STEP_INDEX.UPLOAD_IMAGES],
                    images: {
                        ...state[STEP_INDEX.UPLOAD_IMAGES].images,
                        [selectedImageIndex!]: {
                            ...state[STEP_INDEX.UPLOAD_IMAGES].images[selectedImageIndex!],
                            effect: StoryImage.EFFECT_DEFAULT_VALUE,
                        },
                    },
                },
            });
        }
        case STEPS_ACTION_TYPE.setCategory:
            return ({
                ...state,
                [STEP_INDEX.CHOOSE_CATEGORY]: {
                    ...state[STEP_INDEX.CHOOSE_CATEGORY],
                    category: action.category,
                },
            });
        default:
            throw new Error(SWITCH_DEFAULT_ERROR_MESSAGE);
    }
};
