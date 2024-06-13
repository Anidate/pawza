import type mongoose from 'mongoose';
import { type FilterQuery } from 'mongoose';

import { type PotentialMatchDoc, PotentialMatchModel, PotentialMatchStatus } from '../models/potential-match.js';
import { type UserDoc, UserModel, UserPurpose } from '../models/user.js';

export interface PotentialMatchPopulated extends Omit<PotentialMatchDoc, 'user'> {
  user: UserDoc;
}

export const getPotentialMatches = async (userId: mongoose.Types.ObjectId) => {
  const user = await UserModel.findById(userId).orFail();

  const matchesToIgnore = await PotentialMatchModel.find({
    user: user._id,
    status: { $ne: PotentialMatchStatus.Pending },
  });

  const userIdsToIgnore = matchesToIgnore.map((potentialMatch) => potentialMatch.suggestedUser);
  userIdsToIgnore.push(user._id); // don't suggest my self
  const userChoices: FilterQuery<UserDoc> = {
    _id: { $nin: userIdsToIgnore },
    gender: { $in: user.genderPreference }, // checking that the suggested user gender matches my preferences
    genderPreference: user.gender, // checking that my gender is at the users preferences
  };

  // if my purpose and the other user purpose match or at least one is all
  if (user.purpose !== UserPurpose.All) {
    userChoices.purpose = { $in: [user.purpose, UserPurpose.All] };
  }

  const usersToSuggest = await UserModel.aggregate([
    { $match: userChoices },
    { $match: { active: true } },
    { $sample: { size: 10 } },
  ]);

  return usersToSuggest;
};

export const acceptPotentialMatch = async (user: mongoose.Types.ObjectId, suggestedUser: mongoose.Types.ObjectId) => {
  await PotentialMatchModel.updateOne(
    { user, suggestedUser },
    { $set: { status: PotentialMatchStatus.Accepted } },
    { upsert: true },
  );
};

export const declinePotentialMatch = async (user: mongoose.Types.ObjectId, suggestedUser: mongoose.Types.ObjectId) => {
  await PotentialMatchModel.updateOne(
    { user, suggestedUser },
    { $set: { status: PotentialMatchStatus.Declined } },
    { upsert: true },
  );
};
