import React, { ReactElement } from 'react';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import MuiPaper from '@mui/material/Paper';
import PropTypes from 'prop-types';

const Paper = ({
    isLoading,
    header,
    children,
    footer,
}: {
    isLoading: boolean;
    header: ReactElement;
    children: null | ReactElement;
    footer: ReactElement;
}): JSX.Element => {
    let content: ReactElement;

    if (isLoading) {
        content = (
            <Stack flexGrow={1} justifyContent="center" alignItems="center">
                <Fade in style={{ transitionDelay: '800ms' }}>
                    <CircularProgress />
                </Fade>
            </Stack>
        );
    } else {
        content = (
            <>
                <Stack flexGrow={1}>
                    { header }
                    { children }
                </Stack>
                {
                    footer && (
                        <Stack direction="row" justifyContent="space-between">
                            { footer }
                        </Stack>
                    )
                }
            </>
        );
    }

    return (
        <MuiPaper
            sx={{
                width: 1020,
                minHeight: 780,
                p: 5,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            { content }
        </MuiPaper>
    );
};

Paper.propTypes = {
    isLoading: PropTypes.bool,
    header: PropTypes.element,
    children: PropTypes.element,
    footer: PropTypes.element,
};

Paper.defaultProps = {
    isLoading: false,
    header: null,
    children: null,
    footer: null,
};

export default Paper;
