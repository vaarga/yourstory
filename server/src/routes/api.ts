import { Router } from 'express';
import { API_PATH_SEGMENT } from '../constants/url';
import requireAuth from '../utils/middlewares/requireAuth';
import validateUser from '../utils/middlewares/validateUser';
import appRouter from './app/app.router';
import authRouter from './auth/auth.router';
import initialDataRouter from './initial-data/initial-data.router';

const apiRouter = Router();

// All API routes
apiRouter.use(API_PATH_SEGMENT.app.segment, requireAuth, validateUser, appRouter);
apiRouter.use(API_PATH_SEGMENT.auth.segment, authRouter);
apiRouter.use(API_PATH_SEGMENT.initialData.segment, initialDataRouter);

export default apiRouter;
