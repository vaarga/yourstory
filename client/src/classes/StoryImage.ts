import { SWITCH_DEFAULT_ERROR_MESSAGE } from '../constants/error';

enum EFFECT {
    grayscaleAdjustment = 'grayscale-adjustment',
    brightnessAdjustment = 'brightness-adjustment',
    redAdjustment = 'red-adjustment',
    greenAdjustment = 'green-adjustment',
    blueAdjustment = 'blue-adjustment',
    contrastAdjustment = 'contrast-adjustment',
    invertColors = 'invert-colors',
}

export class StoryImage {
    static readonly EFFECT = EFFECT;

    static readonly EFFECT_DEFAULT_VALUE = {
        [StoryImage.EFFECT.grayscaleAdjustment]: 0,
        [StoryImage.EFFECT.brightnessAdjustment]: 0,
        [StoryImage.EFFECT.redAdjustment]: 0,
        [StoryImage.EFFECT.greenAdjustment]: 0,
        [StoryImage.EFFECT.blueAdjustment]: 0,
        [StoryImage.EFFECT.contrastAdjustment]: 0,
        [StoryImage.EFFECT.invertColors]: false,
    };

    static readonly MIN_AND_MAX_SLIDER_VALUE = {
        grayscale: 100,
        brightness: 128,
        colors: 255,
        contrast: 128,
    };

    private readonly data: ImageData['data'];

    constructor(
        public readonly imageData: ImageData,
        private readonly effect: typeof StoryImage.EFFECT_DEFAULT_VALUE
    ) {
        this.data = imageData.data;
    }

    private iterateOverPixels(this: StoryImage, applyEffect: (i: number) => void) {
        for (let i = 0; i < this.data.length; i += 4) {
            applyEffect(i);
        }
    }

    applyGrayscaleAdjustment(this: StoryImage) {
        const grayscalePercentage = this.effect[StoryImage.EFFECT.grayscaleAdjustment];

        this.iterateOverPixels((i: number) => {
            const avg = (this.data[i] + this.data[i + 1] + this.data[i + 2]) / 3;

            this.data[i] = (this.data[i] * (100 - grayscalePercentage) + (avg * grayscalePercentage)) / 100;
            this.data[i + 1] = (this.data[i + 1] * (100 - grayscalePercentage) + (avg * grayscalePercentage)) / 100;
            this.data[i + 2] = (this.data[i + 2] * (100 - grayscalePercentage) + (avg * grayscalePercentage)) / 100;
        });
    }

    private static truncate(value: number) {
        if (value < 0) {
            return 0;
        }

        if (value > 255) {
            return 255;
        }

        return value;
    }

    applyBrightnessAdjustment(this: StoryImage) {
        this.iterateOverPixels((i: number) => {
            const brightnessAdjustment = this.effect[StoryImage.EFFECT.brightnessAdjustment];

            this.data[i] = StoryImage.truncate(this.data[i] + brightnessAdjustment);
            this.data[i + 1] = StoryImage.truncate(this.data[i + 1] + brightnessAdjustment);
            this.data[i + 2] = StoryImage.truncate(this.data[i + 2] + brightnessAdjustment);
        });
    }

    private truncateOnlyOneColor(
        this: StoryImage,
        color:
            typeof StoryImage.EFFECT.redAdjustment
            | typeof StoryImage.EFFECT.greenAdjustment
            | typeof StoryImage.EFFECT.blueAdjustment
    ) {
        let iteratorIncrementation: 0 | 1 | 2;

        switch (color) {
            case StoryImage.EFFECT.redAdjustment:
                iteratorIncrementation = 0;
                break;
            case StoryImage.EFFECT.greenAdjustment:
                iteratorIncrementation = 1;
                break;
            case StoryImage.EFFECT.blueAdjustment:
                iteratorIncrementation = 2;
                break;
            default:
                throw new Error(SWITCH_DEFAULT_ERROR_MESSAGE);
        }

        const colorAdjustment = this.effect[color];

        this.iterateOverPixels((i: number) => {
            this.data[i + iteratorIncrementation] = StoryImage.truncate(
                this.data[i + iteratorIncrementation] + colorAdjustment
            );
        });
    }

    applyRedAdjustment(this: StoryImage) {
        this.truncateOnlyOneColor(StoryImage.EFFECT.redAdjustment);
    }

    applyGreenAdjustment(this: StoryImage) {
        this.truncateOnlyOneColor(StoryImage.EFFECT.greenAdjustment);
    }

    applyBlueAdjustment(this: StoryImage) {
        this.truncateOnlyOneColor(StoryImage.EFFECT.blueAdjustment);
    }

    applyContrastAdjustment(this: StoryImage) {
        const factor = (259 * (this.effect[StoryImage.EFFECT.contrastAdjustment] + 255))
            / (255 * (259 - this.effect[StoryImage.EFFECT.contrastAdjustment]));

        this.iterateOverPixels((i: number) => {
            this.data[i] = StoryImage.truncate(
                factor * (this.data[i] - StoryImage.MIN_AND_MAX_SLIDER_VALUE.contrast)
                + StoryImage.MIN_AND_MAX_SLIDER_VALUE.contrast
            );
            this.data[i + 1] = StoryImage.truncate(
                factor * (this.data[i + 1] - StoryImage.MIN_AND_MAX_SLIDER_VALUE.contrast)
                + StoryImage.MIN_AND_MAX_SLIDER_VALUE.contrast
            );
            this.data[i + 2] = StoryImage.truncate(
                factor * (this.data[i + 2] - StoryImage.MIN_AND_MAX_SLIDER_VALUE.contrast)
                + StoryImage.MIN_AND_MAX_SLIDER_VALUE.contrast
            );
        });
    }

    applyInvertColors(this: StoryImage) {
        if (this.effect[EFFECT.invertColors]) {
            this.iterateOverPixels((i: number) => {
                this.data[i] = 255 - this.data[i];
                this.data[i + 1] = 255 - this.data[i + 1];
                this.data[i + 2] = 255 - this.data[i + 2];
            });
        }
    }

    applyAllEffects(this: StoryImage) {
        this.applyGrayscaleAdjustment();
        this.applyBrightnessAdjustment();
        this.applyRedAdjustment();
        this.applyGreenAdjustment();
        this.applyBlueAdjustment();
        this.applyContrastAdjustment();
        this.applyInvertColors();
    }
}
