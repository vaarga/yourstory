import React, { Dispatch, ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { Action } from '../../../../../types/typescript/reducers/steps';
import { STEPS_ACTION_TYPE, STEP_INDEX } from '../../../../../reducers/steps';
import { STORY_MAX } from '../../../../../constants/story';

const WriteTitleAndContent = ({
    title,
    content,
    isCompleted,
    dispatch,
}: {
    title: string;
    content: string;
    isCompleted: boolean;
    dispatch: Dispatch<Action>;
}): JSX.Element => {
    const checkAndChangeIsCompleted = (newTitle: string, newContent: string) => {
        if (newTitle !== '' && newContent !== '') {
            if (!isCompleted) {
                dispatch({
                    type: STEPS_ACTION_TYPE.setIsCompleted,
                    stepIndex: STEP_INDEX.WRITE_TITLE_AND_CONTENT,
                    isCompleted: true,
                });
            }
        } else if (isCompleted) {
            dispatch({
                type: STEPS_ACTION_TYPE.setIsCompleted,
                stepIndex: STEP_INDEX.WRITE_TITLE_AND_CONTENT,
                isCompleted: false,
            });
        }
    };

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: STEPS_ACTION_TYPE.setTitle,
            title: event.target.value,
        });

        checkAndChangeIsCompleted(event.target.value, content);
    };

    const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
        let newContent = event.target.value;

        // A new line character would be counted as 1 character (with the input's maxlength attribute) but on the server
        // side it would occupy 2 characters ('\n') so we have to simulate the server side with the JSON.stringify()
        // (-2 because of the " at the begging and the ending of the text)
        const serverSideContentLength = JSON.stringify(event.target.value).length - 2;

        if (serverSideContentLength > STORY_MAX.contentLength) {
            newContent = event.target.value.slice(0, STORY_MAX.contentLength - serverSideContentLength);
        }

        dispatch({
            type: STEPS_ACTION_TYPE.setContent,
            content: newContent,
        });

        checkAndChangeIsCompleted(title, newContent);
    };

    return (
        <Stack sx={{ py: 5 }} flexGrow={1}>
            <TextField
                sx={{
                    width: '100%',
                    // Padding right and left is 14px
                    maxWidth: `calc(${STORY_MAX.titleLength}ch + 28px)`,
                    mb: 4,
                }}
                inputProps={{
                    maxLength: STORY_MAX.titleLength,
                }}
                label="Title"
                value={title}
                onChange={handleTitleChange}
            />
            <TextField
                sx={{ flexGrow: 1 }}
                InputProps={{
                    sx: {
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'start',
                    },
                }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                inputProps={{
                    maxLength: STORY_MAX.contentLength,
                }}
                label="Content"
                value={content}
                fullWidth
                multiline
                rows={19}
                onChange={handleContentChange}
            />
        </Stack>
    );
};

WriteTitleAndContent.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default WriteTitleAndContent;
