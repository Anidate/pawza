import { Router } from 'express';

import { getUnreadNotificationsCount } from '../../bll/notifications.js';

const notificationsRouter = Router();

notificationsRouter.get('/unread-count', async (req, res) => {
  const unreadCount = await getUnreadNotificationsCount(req.user.id);
  res.json(unreadCount);
});

export { notificationsRouter };
