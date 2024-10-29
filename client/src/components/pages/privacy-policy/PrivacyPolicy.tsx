import React from 'react';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import Button from '@mui/material/Button';
import PublicPage from '../../reusables/PublicPage';
import { PAGE_PATH_SEGMENT } from '../../../constants/url';

const PrivacyPolicy = (): JSX.Element => (
    <PublicPage
        icon={<AdminPanelSettingsRoundedIcon />}
        text="Coming soon"
        button={(
            <Button href={PAGE_PATH_SEGMENT.root}>
                Go to homepage
            </Button>
        )}
    />
);

export default PrivacyPolicy;
