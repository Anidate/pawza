import { Router } from 'express';
import mongoose, { isObjectIdOrHexString } from 'mongoose';

import { createMessage, getMatchedChats , getMessagesForChat } from '../../bll/chats.js';
import { AppBadRequestError } from '../../errors/app-bad-request.js';
import { auth } from '../middlewares/auth.js';

const chatsRouter = Router();

chatsRouter.get('/', auth(), async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.id);
  const chats = await getMatchedChats(userId);
  res.json(chats);
});

chatsRouter.post('/:chatId/messages', auth(), async (req, res) => {
  const { content } = req.body;
  const { chatId } = req.params;
  const senderId = req.user.id;

  if (!isObjectIdOrHexString(chatId)) {
    throw new AppBadRequestError();
  }

  const newMessage = await createMessage(content, new mongoose.Types.ObjectId(chatId), new mongoose.Types.ObjectId(senderId));
  res.status(201).json(newMessage);
});

chatsRouter.get('/:chatId/messages', auth(), async (req, res) => {
  const { chatId } = req.params;

  if (!isObjectIdOrHexString(chatId)) {
    throw new AppBadRequestError();
  }
  const messages = await getMessagesForChat(new mongoose.Types.ObjectId(chatId));
  res.status(200).json(messages);
});

export { chatsRouter };
