import React, { ReactElement, cloneElement } from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import CenteredContainer from './CenteredContainer';

const PublicPage = ({
    icon,
    text,
    button,
}: {
    icon: ReactElement;
    text: string;
    button: ReactElement;
}): JSX.Element => (
    <CenteredContainer>
        <>
            { cloneElement(icon, { sx: { fontSize: 125 } }) }
            <Typography
                sx={{
                    maxWidth: 500,
                    px: 2,
                    mt: 2,
                    mb: 5,
                    textAlign: 'center',
                }}
                variant="h4"
            >
                { text }
            </Typography>
            { button }
        </>
    </CenteredContainer>
);

PublicPage.propTypes = {
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
    button: PropTypes.element.isRequired,
};

export default PublicPage;
