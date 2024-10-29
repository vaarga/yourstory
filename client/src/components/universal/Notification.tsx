import React from 'react';
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppDispatch, State } from '../../store';
import { universalAction } from '../../store/universal/universal-slice';

const Notification = (): JSX.Element => {
    const appDispatch = useAppDispatch();
    const { isOpened, severity, message } = useSelector((state: State) => state.universal.notification);

    return (
        <Snackbar
            open={isOpened}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            autoHideDuration={6000}
            onClose={() => appDispatch(universalAction.hideNotification())}
        >
            <Alert elevation={6} severity={severity!}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
