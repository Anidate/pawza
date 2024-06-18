import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { type ChatInfo, fetchChats } from '../../api/chats';
import FullScreenLoader from '../Loader/FullScreenLoader';
import ChatItem from './ChatItem';

function ChatsPage() {
  const {
    data: chats = [],
    isLoading,
    error,
  } = useQuery<ChatInfo[]>({
    queryKey: ['chats'],
    queryFn: fetchChats,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }
  if (error) {
    return <div>Error loading chats</div>;
  }

  return (
    <Box
      sx={{
        width: '100%',
        padding: '1rem',
        height: '100%', // Adjust to fill the parent container
        overflowY: 'auto', // Allows inner box to scroll
        boxSizing: 'border-box', // Include padding in height calculation
        textAlign: 'left',
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center', color: '#333' }}>
        Chats
      </Typography>
      {chats.map((chat) => (
        <ChatItem
          key={chat._id}
          name={`${chat.matchedUser.firstName} ${chat.matchedUser.lastName}`}
          lastMessage={chat.latestMessage}
          profilePic={chat.matchedUser.profilePic}
          to={`/chats/${chat._id}`}
        />
      ))}
      {chats.length === 0 && (
        <Typography variant="h4" sx={{ marginTop: '3rem', textAlign: 'center', color: '#777' }}>
          {"You don't have any matches yet, but when you do, you could chat with them here!"}
        </Typography>
      )}
    </Box>
  );
}

export default ChatsPage;
