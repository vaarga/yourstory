import { Router } from 'express';
import { API_PATH_SEGMENT } from '../../constants/url';
import requireAuth from '../../utils/middlewares/requireAuth';
import { signOut } from './auth.controller';
import requireNotAuth from '../../utils/middlewares/requireNotAuth';
import signInRouter from './signIn/sign-in.router';

const authRouter = Router();

authRouter.get(API_PATH_SEGMENT.auth.signOut.segment, requireAuth, signOut);
authRouter.use(API_PATH_SEGMENT.auth.signIn.segment, requireNotAuth, signInRouter);

export default authRouter;
