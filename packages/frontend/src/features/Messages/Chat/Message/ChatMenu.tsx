// ChatMenu.js

import './styles.css';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { fetchChats } from '../../../../api/chats';
import ChatsItem from './ChatsItem';

type Chat = {
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
};

function ChatMenu() {
  const {
    data: chats = [],
    isLoading,
    error,
  } = useQuery<Chat[]>({
    queryKey: ['chats'],
    queryFn: async () => {
      console.log('Fetching chats...');
      const response = await fetchChats();
      console.log('Fetched chats response:', response);
      return response.data;
    },
  });

  if (isLoading) {
    console.log('Loading chats...');
    return <div>Loading...</div>;
  }
  if (error) {
    console.error('Error loading chats:', error);
    return <div>Error loading chats</div>;
  }

  console.log('Chats data:', chats);

  return (
    <Box className="ChatApp main-container">
      <div className="sb-chats">
        <h2 className="chats-title">Chats</h2>
        {chats.map((chat) => (
          <ChatsItem
            key={chat._id}
            props={{
              name: `${chat.users[1].firstName} ${chat.users[1].lastName}`,
              lastMessage: chat.latestMessage ? chat.latestMessage.content : 'No messages yet',
              timeStamp: chat.latestMessage ? new Date(chat.latestMessage.timestamp).toLocaleString() : '',
              to: `/chats/${chat._id}`,
            }}
          />
        ))}
      </div>
    </Box>
  );
}

export default ChatMenu;
