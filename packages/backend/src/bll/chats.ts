import type mongoose from 'mongoose';

import { ChatModel } from '../models/chat.js';
import { MessageModel } from '../models/message.js';

// Function to get all matched chats for a user
export const getMatchedChats = async (userId: mongoose.Types.ObjectId) => {
  const chats = await ChatModel.find({
    users: userId,
  })
    .populate('users', 'firstName lastName');
  return chats;
};

// Function to create a new chat
export const createChat = async (userId1: mongoose.Types.ObjectId, userId2: mongoose.Types.ObjectId) => {
  const newChat = new ChatModel({
    users: [userId1, userId2],
  });

  await newChat.save();
};

// Function to create a new message
export const createMessage = async (content: string, chatId: mongoose.Types.ObjectId, senderId: mongoose.Types.ObjectId) => {
  const newMessage = new MessageModel({
    content,
    sender: senderId,
    chatId,
  });

  await newMessage.save();
  await ChatModel.updateOne({ _id: chatId }, { latestMessage: content });

  return newMessage;
};

// Function to get all messages for a chat
export const getMessagesForChat = async (chatId: mongoose.Types.ObjectId) => {
  const messages = await MessageModel.find({ chatId })
    .sort({ createdAt: 1 })
    .populate('sender', 'firstName lastName');

  return messages;
};
