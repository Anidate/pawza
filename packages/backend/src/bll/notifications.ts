import type mongoose from 'mongoose';
import { type FilterQuery } from 'mongoose';

import { type NotificationDoc, NotificationModel } from '../models/notification.js';

export const getUnreadNotificationsCount = async (userId: mongoose.Types.ObjectId): Promise<number> => {
  const res = await NotificationModel.aggregate([
    { $match: { user: userId, seen: false } satisfies FilterQuery<NotificationDoc> },
    { $count: 'count' },
  ]);

  return res[0]?.count || 0;
};
