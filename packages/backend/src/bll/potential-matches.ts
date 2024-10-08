import type mongoose from 'mongoose';
import { type FilterQuery } from 'mongoose';

import { type PotentialMatchDoc, PotentialMatchModel, PotentialMatchStatus } from '../models/potential-match.js';
import { type UserDoc, UserModel, UserPurpose } from '../models/user.js';
import { createChat } from './chats.js'; // Import the createChat method
import { createYouWereLikedNotification } from './notifications.js';

export interface PotentialMatchPopulated extends Omit<PotentialMatchDoc, 'user'> {
  user: UserDoc;
}

export const getPotentialMatches = async (
  userId: mongoose.Types.ObjectId,
  userIdsToIgnore: mongoose.Types.ObjectId[],
) => {
  const user = await UserModel.findById(userId).orFail();

  const matchesToIgnore = await PotentialMatchModel.find({
    user: user._id,
    status: { $ne: PotentialMatchStatus.Pending },
  });

  userIdsToIgnore.push(...matchesToIgnore.map((potentialMatch) => potentialMatch.suggestedUser));
  userIdsToIgnore.push(user._id); // don't suggest myself

  const userChoices: FilterQuery<UserDoc> = {
    _id: { $nin: userIdsToIgnore },
    gender: { $in: user.genderPreference },
    genderPreference: user.gender,
  };

  if (user.purpose !== UserPurpose.All) {
    userChoices.purpose = { $in: [user.purpose, UserPurpose.All] };
  }

  const usersToSuggest = await UserModel.aggregate([{ $match: userChoices }, { $sample: { size: 2 } }]);

  return usersToSuggest;
};

export const acceptPotentialMatch = async (
  user: mongoose.Types.ObjectId,
  suggestedUser: mongoose.Types.ObjectId,
  isSuperPaw = false,
) => {
  if (await PotentialMatchModel.exists({ user, suggestedUser, status: PotentialMatchStatus.Accepted })) {
    return;
  }

  await PotentialMatchModel.updateOne(
    { user, suggestedUser },
    { $set: { status: PotentialMatchStatus.Accepted } },
    { upsert: true },
  );

  if (isSuperPaw) {
    await UserModel.updateOne({ _id: user }, { $set: { lastSuperPaw: new Date() } });
  }

  await createYouWereLikedNotification(suggestedUser, user, isSuperPaw);

  // Check for mutual match
  const reverseMatch = await PotentialMatchModel.findOne({
    user: suggestedUser,
    suggestedUser: user,
    status: PotentialMatchStatus.Accepted,
  });

  if (reverseMatch) {
    return await createChat(user, suggestedUser);
  }

  if (isSuperPaw) {
    return await createChat(user, suggestedUser, user);
  }
};

export const declinePotentialMatch = async (user: mongoose.Types.ObjectId, suggestedUser: mongoose.Types.ObjectId) => {
  await PotentialMatchModel.updateOne(
    { user, suggestedUser },
    { $set: { status: PotentialMatchStatus.Declined } },
    { upsert: true },
  );
};
