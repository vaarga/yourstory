import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import MuiModal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import StoryImage from './StoryImage';
import StoryDeletion from './StoryDeletion';
import UserDeletion from './UserDeletion';
import { useAppDispatch, State } from '../../../store';
import { universalAction } from '../../../store/universal/universal-slice';
import { MODAL_TYPE } from '../../../constants/modal';
import { SWITCH_DEFAULT_ERROR_MESSAGE } from '../../../constants/error';

const Modal = (): JSX.Element => {
    const appDispatch = useAppDispatch();
    const { type } = useSelector((state: State) => state.universal.modal);

    let content: null | ReactElement;

    const handleModalClose = () => {
        appDispatch(universalAction.closeModal());
    };

    switch (type) {
        case MODAL_TYPE.STORY_IMAGE:
            content = <StoryImage />;
            break;
        case MODAL_TYPE.STORY_DELETION:
            content = <StoryDeletion closeModal={handleModalClose} />;
            break;
        case MODAL_TYPE.USER_DELETION:
            content = <UserDeletion closeModal={handleModalClose} />;
            break;
        case null:
            content = null;
            break;
        default:
            throw new Error(SWITCH_DEFAULT_ERROR_MESSAGE);
    }

    return (
        <MuiModal
            open={type !== null}
            onClose={handleModalClose}
        >
            <Box
                sx={{
                    display: 'inline-flex',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '100vw',
                    maxHeight: '100vh',
                    p: 3,
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: 6,
                    outline: 0,
                }}
            >
                { content }
            </Box>
        </MuiModal>
    );
};

export default Modal;
