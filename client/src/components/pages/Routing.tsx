import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Root from './Root';
import Home from './home/Home';
import RequireNotAuth from '../utils/routing/RequireNotAuth';
import Google from './auth/sign-in/google/Google';
import Failure from './auth/sign-in/google/failure/Failure';
import PrivacyPolicy from './privacy-policy/PrivacyPolicy';
import RequireAuth from '../utils/routing/RequireAuth';
import App from './app/App';
import ExploreStories from './app/explore-stories/ExploreStories';
import MyStories from './app/my-stories/MyStories';
import CreateStory from './app/create-story/CreateStory';
import MyAccount from './app/my-account/MyAccount';
import NotFound from './not-found/NotFound';
import { PAGE_PATH_SEGMENT } from '../../constants/url';

const Routing = (): JSX.Element => {
    const SIGN_IN_GOOGLE_PATH_SEGMENT = `${PAGE_PATH_SEGMENT.auth.signIn.segment}/` +
        `${PAGE_PATH_SEGMENT.auth.signIn.google.segment}`;
    const SIGN_IN_GOOGLE_FAILURE_PATH_SEGMENT = `${PAGE_PATH_SEGMENT.auth.signIn.google.segment}/` +
        `${PAGE_PATH_SEGMENT.auth.signIn.google.failure.segment}`;

    return (
        <BrowserRouter>
            <Routes>
                {/* '/' */}
                <Route path={PAGE_PATH_SEGMENT.root} element={<Root />}>
                    <Route index element={<Home />} />
                    {/* '/auth' */}
                    <Route
                        path={PAGE_PATH_SEGMENT.auth.segment}
                        element={(<Navigate replace to={SIGN_IN_GOOGLE_PATH_SEGMENT} />)}
                    />
                    <Route path={PAGE_PATH_SEGMENT.auth.segment}>
                        <Route
                            path={PAGE_PATH_SEGMENT.auth.signIn.segment}
                            element={(<Navigate replace to={PAGE_PATH_SEGMENT.auth.signIn.google.segment} />)}
                        />
                        <Route path={PAGE_PATH_SEGMENT.auth.signIn.segment}>
                            <Route
                                path={PAGE_PATH_SEGMENT.auth.signIn.google.segment}
                                element={(
                                    <RequireNotAuth>
                                        <Google />
                                    </RequireNotAuth>
                                )}
                            />
                            <Route
                                path={SIGN_IN_GOOGLE_FAILURE_PATH_SEGMENT}
                                element={<Failure />}
                            />
                        </Route>
                    </Route>
                    <Route path={PAGE_PATH_SEGMENT.privacyPolicy.segment} element={<PrivacyPolicy />} />
                    {/* '/app' */}
                    <Route
                        path={PAGE_PATH_SEGMENT.app.segment}
                        element={<Navigate replace to={PAGE_PATH_SEGMENT.app.exploreStories.segment} />}
                    />
                    <Route
                        path={PAGE_PATH_SEGMENT.app.segment}
                        element={(
                            <RequireAuth>
                                <App />
                            </RequireAuth>
                        )}
                    >
                        <Route path={PAGE_PATH_SEGMENT.app.exploreStories.segment} element={<ExploreStories />} />
                        <Route path={PAGE_PATH_SEGMENT.app.myStories.segment} element={<MyStories />} />
                        <Route path={PAGE_PATH_SEGMENT.app.createStory.segment} element={<CreateStory />} />
                        <Route path={PAGE_PATH_SEGMENT.app.myAccount.segment} element={<MyAccount />} />
                    </Route>
                    <Route path={PAGE_PATH_SEGMENT.any} element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;
