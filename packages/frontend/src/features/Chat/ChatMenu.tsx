import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { type Chat, fetchChats } from '../../api/chats';
import ChatItem from './ChatItem';

function ChatMenu() {
  const {
    data: chats = [],
    isLoading,
    error,
  } = useQuery<Chat[]>({
    queryKey: ['chats'],
    queryFn: fetchChats,
  });

  console.log(chats);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
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
            name={`${chat.matchedUser.firstName} ${chat.matchedUser.lastName}`}
            lastMessage={chat.latestMessage || 'No messages yet'}
            to={`/chats/${chat._id}`}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ChatMenu;
