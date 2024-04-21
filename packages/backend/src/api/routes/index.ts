import { Router } from 'express';

import { usersRouter } from './users.js';

const indexRouter = Router();

indexRouter.use('/auth', usersRouter);
indexRouter.use('/users', usersRouter);

export { indexRouter };
