import { Router } from 'express';

import { UserModel } from '../../models/user.js';
import { toMatchDto } from '../dtos/match.js';

const matchesRouter = Router();

matchesRouter.get('/', async (req, res) => {
  const users = await UserModel.find().limit(5);
  res.json(users.map((user) => toMatchDto(user)));
});

export { matchesRouter };
