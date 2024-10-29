import { EFFECT } from '../types/typescript/reducers/steps';
import { StoryImage } from '../classes/StoryImage';
import { SWITCH_DEFAULT_ERROR_MESSAGE } from '../constants/error';

export default (effect: EFFECT) => {
    switch (effect) {
        case StoryImage.EFFECT.grayscaleAdjustment:
            return StoryImage.MIN_AND_MAX_SLIDER_VALUE.grayscale;
        case StoryImage.EFFECT.brightnessAdjustment:
            return StoryImage.MIN_AND_MAX_SLIDER_VALUE.brightness;
        case StoryImage.EFFECT.redAdjustment:
        case StoryImage.EFFECT.greenAdjustment:
        case StoryImage.EFFECT.blueAdjustment:
            return StoryImage.MIN_AND_MAX_SLIDER_VALUE.colors;
        case StoryImage.EFFECT.contrastAdjustment:
            return StoryImage.MIN_AND_MAX_SLIDER_VALUE.contrast;
        default:
            throw new Error(SWITCH_DEFAULT_ERROR_MESSAGE);
    }
};
