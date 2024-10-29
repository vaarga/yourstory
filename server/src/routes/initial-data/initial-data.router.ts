import { Router } from 'express';
import { getInitialData } from './initial-data.controller';

const initialDataRouter = Router();

initialDataRouter.get('/', getInitialData);

export default initialDataRouter;
