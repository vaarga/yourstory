import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { useAppDispatch, State } from '../../../store';
import { deleteStory } from '../../../store/stories/stories-actions';

const StoryDeletion = ({ closeModal }: { closeModal: () => void }): JSX.Element => {
    const appDispatch = useAppDispatch();
    const { ui: { modal: { isDeletingStory } } } = useSelector((state: State) => state);

    return (
        <Box>
            <Typography sx={{ mb: 3 }}>
                Are you sure you want to permanently delete this story?
            </Typography>
            <Stack direction="row" justifyContent="space-between" gap={2}>
                <LoadingButton
                    loading={isDeletingStory}
                    disabled={isDeletingStory}
                    color="delete"
                    onClick={() => appDispatch(deleteStory())}
                >
                    Delete
                </LoadingButton>
                <Button onClick={closeModal}>
                    Cancel
                </Button>
            </Stack>
        </Box>
    );
};

StoryDeletion.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default StoryDeletion;
