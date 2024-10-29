import React from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PublicPage from '../../../../reusables/PublicPage';
import GoogleSignInButton from './GoogleSignInButton';

const Google = (): JSX.Element => (
    <PublicPage
        icon={<PersonRoundedIcon />}
        text="Sign up or sign in with:"
        button={<GoogleSignInButton />}
    />
);

export default Google;
