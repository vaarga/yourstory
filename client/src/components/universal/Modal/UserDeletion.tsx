import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { useAppDispatch, State } from '../../../store';
import { deleteOrBanUser } from '../../../store/user/user-actions';

const UserDeletion = ({ closeModal }: { closeModal: () => void }): JSX.Element => {
    const appDispatch = useAppDispatch();
    const {
        ui: { modal: { isDeletingUser } },
        universal: { modal: { auxData } },
        user: { uuid: userUuid },
    } = useSelector((state: State) => state);
    const navigate = useNavigate();

    let deleteOrBanWord = 'delete';
    let isBanning = false;
    let uuid = userUuid!;

    if (auxData?.authorUuid) {
        deleteOrBanWord = 'ban';
        isBanning = true;
        uuid = auxData.authorUuid;
    }

    return (
        <Box>
            <Typography sx={{ mb: 3 }}>
                { `Are you sure you want to permanently ${deleteOrBanWord} this account?` }
            </Typography>
            <Stack direction="row" justifyContent="space-between" gap={2}>
                <LoadingButton
                    loading={isDeletingUser}
                    disabled={isDeletingUser}
                    color="delete"
                    onClick={() => appDispatch(deleteOrBanUser(uuid, isBanning, navigate))}
                >
                    { deleteOrBanWord }
                </LoadingButton>
                <Button onClick={closeModal}>
                    Cancel
                </Button>
            </Stack>
        </Box>
    );
};

UserDeletion.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default UserDeletion;
