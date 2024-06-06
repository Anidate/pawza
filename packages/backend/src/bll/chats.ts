import type mongoose from 'mongoose';
import { ChatModel } from '../models/chat.js';
import { PotentialMatchModel } from '../models/potential-match.js';

export const getMatchedChats = async (userId: mongoose.Types.ObjectId) => {
  // Find all matches where the user is either the user or suggestedUser
  const userMatches = await PotentialMatchModel.find({
    user: userId,
    status: 'accepted',
  })
    .populate('user', 'firstName lastName email')
    .populate('suggestedUser', 'firstName lastName email');

  const suggestedMatches = await PotentialMatchModel.find({
    suggestedUser: userId,
    status: 'accepted',
  })
    .populate('user', 'firstName lastName email')
    .populate('suggestedUser', 'firstName lastName email');

  // Filter mutual matches
  const mutualMatches = userMatches.filter((userMatch) =>
    suggestedMatches.some(
      (suggestedMatch) =>
        suggestedMatch.user._id.equals(userMatch.suggestedUser._id) &&
        suggestedMatch.suggestedUser._id.equals(userMatch.user._id),
    ),
  );

  // Collect mutual user IDs
  const mutualUserIds = mutualMatches.map((match) => match.suggestedUser._id);

  // Find all chats where the user is part of the chat users
  const chats = await ChatModel.find({
    users: { $in: [userId, ...mutualUserIds] },
  })
    .populate('users', 'firstName lastName email')
    .populate('latestMessage');

  return chats;
};

export const createChat = async (userId1: mongoose.Types.ObjectId, userId2: mongoose.Types.ObjectId) => {
  const newChat = new ChatModel({
    users: [userId1, userId2],
  });

  await newChat.save();
};
