import React from 'react';
import Stack from '@mui/material/Stack';
import { Outlet } from 'react-router-dom';
import HeaderNavigationBar from './HeaderNavigationBar';

const App = (): JSX.Element => (
    <>
        <HeaderNavigationBar />
        <Stack
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            flexGrow={1}
            component="main"
        >
            <Outlet />
        </Stack>
    </>
);

export default App;
