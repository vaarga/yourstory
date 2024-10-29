import React, { ReactElement } from 'react';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

const CenteredContainer = ({ children }: { children: ReactElement }): JSX.Element => (
    <Stack
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
        component="main"
    >
        { children }
    </Stack>
);

CenteredContainer.propTypes = {
    children: PropTypes.element.isRequired,
};

export default CenteredContainer;
