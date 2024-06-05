import { Router } from 'express';

import { getMatchedChats } from '../../bll/chats.js';

const chatsRouter = Router();

chatsRouter.get('/', async (req, res) => {
  console.log('Received request to /chats endpoint');
  console.log('User ID:', req.user.id);

  const chats = await getMatchedChats(req.user.id);

  console.log('Fetched chats:', chats);

  res.status(200).json(chats);
});

export { chatsRouter };
