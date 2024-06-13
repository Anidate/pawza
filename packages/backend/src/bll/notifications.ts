import type mongoose from 'mongoose';
import { type FilterQuery } from 'mongoose';

import { type NotificationDoc, NotificationModel } from '../models/notification.js';

export const getUnreadNotificationsCount = async (userId: mongoose.Types.ObjectId): Promise<number> => {
  const res = await NotificationModel.aggregate([
    { $match: { user: userId, read: false } satisfies FilterQuery<NotificationDoc> },
    { $count: 'count' },
  ]);

  return res[0]?.count || 0;
};

export const markNotificationAsRead = async (id: mongoose.Types.ObjectId) =>
  await NotificationModel.updateOne({ _id: id }, { $set: { read: true } });
