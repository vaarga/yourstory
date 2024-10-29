import { Router } from 'express';
import { heartStory, unheartStory } from './heart.controller';

const heartRouter = Router();

heartRouter.post('/:storyUuid', heartStory);
heartRouter.delete('/:storyUuid', unheartStory);

export default heartRouter;
