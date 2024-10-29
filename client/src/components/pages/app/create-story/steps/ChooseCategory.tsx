import React, { Dispatch } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import { STORY_CATEGORY } from '../../../../../constants/story';
import { Action } from '../../../../../types/typescript/reducers/steps';
import { STEPS_ACTION_TYPE, STEP_INDEX } from '../../../../../reducers/steps';
import formatEnumElementToLabelText from '../../../../../utils/formatEnumElementToLabelText';

const ChooseCategory = ({
    category,
    isCompleted,
    dispatch,
}: {
    category: null | STORY_CATEGORY;
    isCompleted: boolean;
    dispatch: Dispatch<Action>;
}): JSX.Element => {
    const handleCategoryChange = (event: SelectChangeEvent) => {
        dispatch({
            type: STEPS_ACTION_TYPE.setCategory,
            category: event.target.value as STORY_CATEGORY,
        });

        if (!isCompleted) {
            dispatch({
                type: STEPS_ACTION_TYPE.setIsCompleted,
                stepIndex: STEP_INDEX.CHOOSE_CATEGORY,
                isCompleted: true,
            });
        }
    };

    return (
        <Box sx={{ pt: 5 }}>
            <FormControl sx={{ maxWidth: 400 }} fullWidth>
                <InputLabel id="category-select-label">
                    Category
                </InputLabel>
                <Select
                    labelId="category-select-label"
                    value={category === null ? '' : category}
                    label="Category"
                    onChange={handleCategoryChange}
                >
                    {
                        Object.keys(STORY_CATEGORY).map(storyCategory => (
                            <MenuItem key={storyCategory} value={storyCategory}>
                                { formatEnumElementToLabelText(storyCategory) }
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    );
};

ChooseCategory.propTypes = {
    category: PropTypes.string,
    isCompleted: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};

ChooseCategory.defaultProps = {
    category: null,
};

export default ChooseCategory;
