import { Router } from 'express';

import { getMatchedChats } from '../../bll/chats.js';

const chatsRouter = Router();

chatsRouter.get('/', async (req, res) => {
  const chats = await getMatchedChats(req.user.id);
  res.status(200).json(chats);
});

export { chatsRouter };
