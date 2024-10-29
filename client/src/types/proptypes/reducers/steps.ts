import PropTypes from 'prop-types';
import { StoryImage } from '../../../classes/StoryImage';

export const EffectPropType = PropTypes.shape({
    [StoryImage.EFFECT.grayscaleAdjustment]: PropTypes.number.isRequired,
    [StoryImage.EFFECT.brightnessAdjustment]: PropTypes.number.isRequired,
    [StoryImage.EFFECT.redAdjustment]: PropTypes.number.isRequired,
    [StoryImage.EFFECT.greenAdjustment]: PropTypes.number.isRequired,
    [StoryImage.EFFECT.blueAdjustment]: PropTypes.number.isRequired,
    [StoryImage.EFFECT.contrastAdjustment]: PropTypes.number.isRequired,
    [StoryImage.EFFECT.invertColors]: PropTypes.bool.isRequired,
});

const ImagePropType = PropTypes.shape({
    data: PropTypes.shape({
        thumbnail: PropTypes.instanceOf(ImageData),
        preview: PropTypes.instanceOf(ImageData),
    }),
    effect: EffectPropType.isRequired,
});

export const ImagesPropType = PropTypes.shape({
    0: ImagePropType.isRequired,
    1: ImagePropType.isRequired,
    2: ImagePropType.isRequired,
});
