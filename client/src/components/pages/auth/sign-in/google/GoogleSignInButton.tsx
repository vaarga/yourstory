import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GLogoIcon from './GLogoIcon';
import { API_PATH_SEGMENT } from '../../../../../constants/url';

const GoogleSignInButton = (): JSX.Element => {
    const GOOGLE_SIGN_IN_URL = API_PATH_SEGMENT.root + API_PATH_SEGMENT.auth.segment
        + API_PATH_SEGMENT.auth.signIn.segment + API_PATH_SEGMENT.auth.signIn.google.segment;

    return (
        <Typography
            sx={{
                display: 'flex',
                padding: '1px 10px 1px 1px',
                borderRadius: '2px',
                lineHeight: '38px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: 14,
                color: 'googleSignInButton.text',
                backgroundColor: 'googleSignInButton.background.default',
                '&:hover': {
                    cursor: 'pointer',
                },
                '&:active': {
                    backgroundColor: 'googleSignInButton.background.active',
                },
            }}
            component="a"
            href={GOOGLE_SIGN_IN_URL}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 38,
                    marginRight: '10px',
                    borderRadius: '2px',
                    backgroundColor: 'googleSignInButton.iconBackground',
                }}
            >
                <GLogoIcon />
            </Box>
            Google
        </Typography>
    );
};

export default GoogleSignInButton;
