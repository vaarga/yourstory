import { Router } from 'express';
import passport from 'passport';
import { PAGE_PATH_SEGMENT, API_PATH_SEGMENT, MAIN_APP_PAGE } from '../../../../constants/url';

const signInGoogleRouter = Router();

const GOOGLE_SIGN_IN_FAILURE_REDIRECT = PAGE_PATH_SEGMENT.auth.segment + PAGE_PATH_SEGMENT.auth.signIn.segment +
    PAGE_PATH_SEGMENT.auth.signIn.google.segment + PAGE_PATH_SEGMENT.auth.signIn.google.failure.segment;

signInGoogleRouter.get('/', passport.authenticate('google', { scope: ['email', 'profile'] }));
signInGoogleRouter.get(
    API_PATH_SEGMENT.auth.signIn.google.callback.segment,
    passport.authenticate('google', {
        successRedirect: MAIN_APP_PAGE,
        failureRedirect: GOOGLE_SIGN_IN_FAILURE_REDIRECT,
    })
);

export default signInGoogleRouter;
