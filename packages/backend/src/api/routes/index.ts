import { Router } from 'express';

import { authRouter } from './auth.js';
import { matchesRouter } from './matches.js';
import { usersRouter } from './users.js';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/users', usersRouter);
indexRouter.use('/matches', matchesRouter);

export { indexRouter };
