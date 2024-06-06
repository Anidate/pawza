// chatApi.ts

import { apiClient } from './base';

// Define the response interface for chats and messages
interface Message {
  _id: string;
  content: string;
  timestamp: string;
  chatId: string;
  sender: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

// Fetch messages for a specific chat
export const fetchMessages = (chatId: string) => apiClient.get<Message[]>(`/messages/${chatId}`);

// Send a new message
export const sendMessage = (chatId: string, content: string) => {
  return apiClient.post<Message>('/messages', { chatId, content });
};
