import { Router } from 'express';
import { getStories, createStory, deleteStory } from './stories.controller';
import uploadImages from '../../../utils/middlewares/multer';
import { API_PATH_SEGMENT } from '../../../constants/url';
import heartRouter from './heart/heart.router';
import imageRouter from './image/image.router';

const storiesRouter = Router();

storiesRouter.get('/', getStories);
storiesRouter.post('/', uploadImages, createStory);
storiesRouter.delete('/:storyUuid', deleteStory);
storiesRouter.use(API_PATH_SEGMENT.app.stories.heart.segment, heartRouter);
storiesRouter.use(API_PATH_SEGMENT.app.stories.image.segment, imageRouter);

export default storiesRouter;
