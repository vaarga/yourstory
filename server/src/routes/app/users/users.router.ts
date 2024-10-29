import { Router } from 'express';
import { deleteOrBanUser, updateUser } from './users.controller';

const usersRouter = Router();

usersRouter.delete('/:userUuid', deleteOrBanUser);
usersRouter.patch('/', updateUser);

export default usersRouter;
