import { Router } from 'express';
import { API_PATH_SEGMENT } from '../../../constants/url';
import signInGoogleRouter from './google/google.router';

const signInRouter = Router();

signInRouter.use(API_PATH_SEGMENT.auth.signIn.google.segment, signInGoogleRouter);

export default signInRouter;
