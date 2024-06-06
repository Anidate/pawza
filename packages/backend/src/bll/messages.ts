import type mongoose from 'mongoose';
import { MessageModel } from '../models/message.js';
import { ChatModel } from '../models/chat.js'; // Import the ChatModel

export const createMessage = async (content: string, chatId: mongoose.Types.ObjectId, authorId: mongoose.Types.ObjectId) => {
  const newMessage = new MessageModel({
    content,
    author: authorId,
    chatId,
  });

  await newMessage.save();

  // Update the relevant chat's latestMessage field
  await ChatModel.findByIdAndUpdate(chatId, { latestMessage: newMessage._id });

  return newMessage;
};

// Function to get messages for a specific chat
export const getMessagesForChat = async (chatId: mongoose.Types.ObjectId) => {
  const messages = await MessageModel.find({ chatId })
    .sort({ timestamp: 1 })
    .populate('author', 'firstName lastName email');

  return messages;
};
