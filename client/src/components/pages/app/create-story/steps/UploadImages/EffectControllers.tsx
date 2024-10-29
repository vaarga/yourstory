import React, { Dispatch, Fragment, ChangeEvent } from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { Effect, Action, EFFECT } from '../../../../../../types/typescript/reducers/steps';
import { STEPS_ACTION_TYPE } from '../../../../../../reducers/steps';
import { StoryImage } from '../../../../../../classes/StoryImage';
import getMinAndMaxSliderValue from '../../../../../../utils/getMinAndMaxSliderValue';
import formatEnumElementToLabelText from '../../../../../../utils/formatEnumElementToLabelText';
import { EffectPropType } from '../../../../../../types/proptypes/reducers/steps';

const EffectControllers = ({
    effect,
    dispatch,
}: {
    effect: null | Effect;
    dispatch: Dispatch<Action>;
}): JSX.Element => {
    const controllersDisabled = effect === null;

    const handleSliderChange = (imageEffect: EFFECT) => (event: Event, newValue: number | number[]) => {
        dispatch({
            type: STEPS_ACTION_TYPE.setImageEffect,
            effect: imageEffect,
            value: (newValue as number),
        });
    };

    const getSliders = () => Object.values(StoryImage.EFFECT).map((imageEffect: EFFECT) => {
        if (typeof StoryImage.EFFECT_DEFAULT_VALUE[imageEffect] === 'number') {
            const minAndMaxSliderValue = getMinAndMaxSliderValue(imageEffect);

            return (
                <Fragment key={imageEffect}>
                    <Typography id={imageEffect} component="label">
                        { formatEnumElementToLabelText(imageEffect) }
                    </Typography>
                    <Slider
                        value={effect ? (effect[imageEffect] as number) : 0}
                        min={-minAndMaxSliderValue}
                        max={minAndMaxSliderValue}
                        disabled={controllersDisabled}
                        aria-labelledby={imageEffect}
                        onChange={handleSliderChange(imageEffect)}
                    />
                </Fragment>
            );
        }

        return null;
    });

    return (
        <Box>
            { getSliders() }
            <Stack flexDirection="row" justifyContent="space-between" gap={2}>
                <FormControlLabel
                    sx={{ marginLeft: 0 }}
                    disabled={controllersDisabled}
                    control={(
                        <Switch
                            checked={effect ? effect[StoryImage.EFFECT.invertColors] : false}
                            onChange={
                                (event: ChangeEvent<HTMLInputElement>) => dispatch({
                                    type: STEPS_ACTION_TYPE.setImageEffect,
                                    effect: StoryImage.EFFECT.invertColors,
                                    value: event.target.checked,
                                })
                            }
                        />
                    )}
                    label={formatEnumElementToLabelText(StoryImage.EFFECT.invertColors)}
                    labelPlacement="start"
                />
                <Button
                    color="warning"
                    disabled={controllersDisabled}
                    onClick={
                        () => {
                            dispatch({
                                type: STEPS_ACTION_TYPE.resetImageEffects,
                            });
                        }
                    }
                >
                    Reset effects
                </Button>
            </Stack>
        </Box>
    );
};

EffectControllers.propTypes = {
    effect: EffectPropType,
    dispatch: PropTypes.func.isRequired,
};

EffectControllers.defaultProps = {
    effect: null,
};

export default EffectControllers;
