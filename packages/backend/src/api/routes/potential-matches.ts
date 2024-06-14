import { Router } from 'express';
import mongoose from 'mongoose';

import { acceptPotentialMatch, declinePotentialMatch, getPotentialMatches } from '../../bll/potential-matches.js';
import { toPotentialMatchDto } from '../dtos/potential-match.js';

const potentialMatcherRouter = Router();

potentialMatcherRouter.get('/', async (req, res) => {
  const users = await getPotentialMatches(req.user.id);
  res.json(users.map((user) => toPotentialMatchDto(user)));
});

potentialMatcherRouter.post('/:suggestedUserId/accept', async (req, res) => {
  const suggestedUserId = new mongoose.Types.ObjectId(req.params.suggestedUserId);
  await acceptPotentialMatch(req.user.id, suggestedUserId);

  res.status(200).send();
});

potentialMatcherRouter.post('/:suggestedUserId/decline', async (req, res) => {
  const suggestedUserId = new mongoose.Types.ObjectId(req.params.suggestedUserId);
  await declinePotentialMatch(req.user.id, suggestedUserId);

  res.status(200).send();
});

export { potentialMatcherRouter };
