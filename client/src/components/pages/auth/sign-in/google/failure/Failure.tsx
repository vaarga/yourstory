import React from 'react';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import Button from '@mui/material/Button';
import PublicPage from '../../../../../reusables/PublicPage';
import { MAIN_SIGN_IN_PAGE } from '../../../../../../constants/url';

const Failure = (): JSX.Element => (
    <PublicPage
        icon={<ErrorRoundedIcon />}
        text="Google authentication failed, this can be due to an internal server error or your account has been banned"
        button={(
            <Button href={MAIN_SIGN_IN_PAGE}>
                Go to sign in
            </Button>
        )}
    />
);

export default Failure;
