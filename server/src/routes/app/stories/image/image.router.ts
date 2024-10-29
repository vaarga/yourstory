import { Router } from 'express';
import { getStoryImage } from './image.controller';

const imageRouter = Router();

imageRouter.get('/:storyUuid', getStoryImage);

export default imageRouter;
