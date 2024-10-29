import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { PAGE_PATH_SEGMENT } from '../../../constants/url';

const HeaderNavigationBar = (): JSX.Element => {
    const location = useLocation();

    return (
        <AppBar sx={{ backgroundColor: 'background.paper' }} position="static">
            <Tabs value={location.pathname} variant="fullWidth" component="nav">
                <Tab
                    label="Explore Stories"
                    component={Link}
                    to={`/${PAGE_PATH_SEGMENT.app.segment}/${PAGE_PATH_SEGMENT.app.exploreStories.segment}`}
                    value={`/${PAGE_PATH_SEGMENT.app.segment}/${PAGE_PATH_SEGMENT.app.exploreStories.segment}`}
                />
                <Tab
                    label="My Stories"
                    component={Link}
                    to={`/${PAGE_PATH_SEGMENT.app.segment}/${PAGE_PATH_SEGMENT.app.myStories.segment}`}
                    value={`/${PAGE_PATH_SEGMENT.app.segment}/${PAGE_PATH_SEGMENT.app.myStories.segment}`}
                />
                <Tab
                    label="Create Story"
                    component={Link}
                    to={`/${PAGE_PATH_SEGMENT.app.segment}/${PAGE_PATH_SEGMENT.app.createStory.segment}`}
                    value={`/${PAGE_PATH_SEGMENT.app.segment}/${PAGE_PATH_SEGMENT.app.createStory.segment}`}
                />
                <Tab
                    label="My Account"
                    component={Link}
                    to={`/${PAGE_PATH_SEGMENT.app.segment}/${PAGE_PATH_SEGMENT.app.myAccount.segment}`}
                    value={`/${PAGE_PATH_SEGMENT.app.segment}/${PAGE_PATH_SEGMENT.app.myAccount.segment}`}
                />
            </Tabs>
        </AppBar>
    );
};

export default HeaderNavigationBar;
