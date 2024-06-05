import { apiClient } from './base';

// Define the response interface
interface Chat {
  _id: string;
  users: Array<{
    firstName: string;
    lastName: string;
    email: string;
  }>;
  latestMessage: {
    content: string;
    timestamp: string;
  };
}

export const fetchChats = () => apiClient.get<Chat[]>('/chats');
