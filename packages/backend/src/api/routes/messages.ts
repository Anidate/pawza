import { Router } from 'express';

import { createMessage, getMessagesForChat } from '../../bll/messages.js';
import { auth } from '../middlewares/auth.js';

const messagesRouter = Router();

// Create a new message
messagesRouter.post('/', auth(), async (req, res) => {
  const { content, chatId } = req.body;
  const authorId = req.user.id;

  const newMessage = await createMessage(content, chatId, authorId);
  res.status(201).json(newMessage);
});

// Get messages for a specific chat
messagesRouter.get('/:chatId', auth(), async (req, res) => {
  const { chatId } = req.params;
  const messages = await getMessagesForChat(chatId);
  res.status(200).json(messages);
});

export { messagesRouter };
