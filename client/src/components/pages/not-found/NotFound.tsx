import React from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Button from '@mui/material/Button';
import PublicPage from '../../reusables/PublicPage';
import { PAGE_PATH_SEGMENT } from '../../../constants/url';

const NotFound = (): JSX.Element => (
    <PublicPage
        icon={<SearchRoundedIcon />}
        text="The page you were looking for was not found"
        button={(
            <Button href={PAGE_PATH_SEGMENT.root}>
                Go to homepage
            </Button>
        )}
    />
);

export default NotFound;
