import { MessageModel } from '../models/message.js';

// Function to create a new message
export const createMessage = async (content, chatId, authorId) => {
  const newMessage = new MessageModel({
    content,
    author: authorId,
    chatId,
  });

  await newMessage.save();
  return newMessage;
};

// Function to get messages for a specific chat
export const getMessagesForChat = async (chatId) => {
  const messages = await MessageModel.find({ chatId })
    .sort({ timestamp: 1 })
    .populate('author', 'firstName lastName email');

  return messages;
};
