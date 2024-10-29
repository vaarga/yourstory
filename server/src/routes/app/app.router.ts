import { Router } from 'express';
import { API_PATH_SEGMENT } from '../../constants/url';
import storiesRouter from './stories/stories.router';
import usersRouter from './users/users.router';

const appRouter = Router();

appRouter.use(API_PATH_SEGMENT.app.stories.segment, storiesRouter);
appRouter.use(API_PATH_SEGMENT.app.users.segment, usersRouter);

export default appRouter;
