import { Router } from 'express';
import mongoose, { isValidObjectId } from 'mongoose';

import { getUnreadNotificationsCount, markNotificationAsRead } from '../../bll/notifications.js';
import { AppBadRequestError } from '../../errors/app-bad-request.js';

const notificationsRouter = Router();

notificationsRouter.get('/unread-count', async (req, res) => {
  const unreadCount = await getUnreadNotificationsCount(req.user.id);
  res.json(unreadCount);
});

notificationsRouter.put('/:id/mark-as-read', async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    throw new AppBadRequestError('Invalid notification ID');
  }

  await markNotificationAsRead(new mongoose.Types.ObjectId(req.params.id));
  res.send();
});

export { notificationsRouter };
