import { type FilterQuery } from 'mongoose';

import { PotentialMatchModel, PotentialMatchStatus } from '../models/potential-match.js';
import { type UserDoc, UserModel, UserPurpose } from '../models/user.js';

export const getPotentialMatches = async (user: UserDoc) => {
  // TODO: GAL
  // MUST HAVE FOR WEDNESDAY:
  // change this so that if there is a PotentialMatch of status ACCEPTED, that user will NOT be suggested
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

  // if my purpose and the other user purpose match or atleast one is all
  if (user.purpose !== UserPurpose.All) {
    userChoices.purpose = { $in: [user.purpose, UserPurpose.All] };
  }

  const matches = await UserModel.aggregate([
    {
      $match: userChoices,
    },
    {
      $sample: { size: 10 },
    },
  ]);

  return matches;
};
