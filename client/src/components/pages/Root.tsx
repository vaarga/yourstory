import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import { Outlet } from 'react-router-dom';
import ThemeProvider from '../utils/ThemeProvider';
import Modal from '../universal/Modal';
import Notification from '../universal/Notification';
import { useAppDispatch, State } from '../../store';
import { getInitialData } from '../../store/user/user-actions';

const Root = (): JSX.Element => {
    const appDispatch = useAppDispatch();
    const { isGettingInitialData } = useSelector((state: State) => state.ui);

    let children: ReactElement;

    useEffect(() => {
        appDispatch(getInitialData());
    }, [appDispatch]);

    if (isGettingInitialData) {
        children = (
            <Stack
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                flexGrow={1}
            >
                <Fade in style={{ transitionDelay: '800ms' }}>
                    <CircularProgress />
                </Fade>
            </Stack>
        );
    } else {
        children = <Outlet />;
    }

    return (
        <ThemeProvider>
            { children }
            <Modal />
            <Notification />
        </ThemeProvider>
    );
};

export default Root;
