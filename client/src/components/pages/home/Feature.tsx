import React, { ReactElement, cloneElement } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const Feature = ({ icon, text }: { icon: ReactElement; text: string }): JSX.Element => (
    <Stack flexDirection="row" gap={2} sx={{ maxWidth: 400 }}>
        { cloneElement(icon, { sx: { fontSize: 42 } }) }
        <Typography variant="h4">
            { text }
        </Typography>
    </Stack>
);

Feature.propTypes = {
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
};

export default Feature;
