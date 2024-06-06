import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchChats } from '../../../../api/chats';
import ChatItem from './ChatItem';

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
      const response = await fetchChats();
      console.log(response.data);
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error('Error loading chats:', error);
    return <div>Error loading chats</div>;
  }

  return (
    <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <Box sx={{ width: '100%', maxWidth: '600px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '1rem' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center', color: '#333' }}>
          Chats
        </Typography>
        {chats.map((chat) => (
          <ChatItem
            key={chat._id}
            props={{
              name: `${chat.users[1].firstName} ${chat.users[1].lastName}`,
              lastMessage: chat.latestMessage ? chat.latestMessage.content : 'No messages yet',
              timeStamp: chat.latestMessage ? new Date(chat.latestMessage.timestamp).toLocaleString() : '',
              to: `/chats/${chat._id}`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ChatMenu;
