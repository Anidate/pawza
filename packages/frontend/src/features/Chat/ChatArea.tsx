import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, TextField } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { fetchMessages, type Message, sendMessage } from '../../api/chats';
import { useAuth } from '../Auth/useAuth';
import MessageItem from './Message/MessageItem'; // Import MessageItemProps

function ChatArea({ chatId }: { chatId: string }) {
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  
  // Fetch messages using useQuery
  const { data: messages = [], isLoading, error } = useQuery<Message[]>({
    queryKey: ['chats', chatId, 'messages'],
    queryFn: () => fetchMessages(chatId),
  });
console.log(messages);

  // Mutation for sending a message
  const mutation = useMutation({
    mutationFn: ({ content }: { content: string }) => sendMessage(chatId, content),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['chats', chatId, 'messages']);
    },
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      await mutation.mutateAsync({ content: newMessage });
      setNewMessage('');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '2rem',
        boxSizing: 'border-box',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          flexGrow: 1,
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {messages.map((message) => (
          <MessageItem
            key={message._id}
            content={message.content}
            timestamp={new Date(message.timestamp)}
            isCurrentUser={message.senderId === user!.id}
          />
        ))}
      </Box>
      <Box
        component="form"
        onSubmit={handleSendMessage}
        display="flex"
        gap="1rem"
        sx={{
          width: '100%',
          maxWidth: '600px',
          padding: '1rem',
          backgroundColor: '#fff',
          boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.1)',
          borderTop: '1px solid #E0E0E0',
          borderRadius: '12px',
          marginTop: '1rem',
        }}
      >
        <TextField
          variant="outlined"
          sx={{
            background: 'white',
            flexGrow: 1,
            borderRadius: '1rem',
          }}
          InputProps={{
            style: { borderRadius: '1rem' },
            endAdornment: (
              <IconButton type="submit">
                <SendIcon />
              </IconButton>
            ),
          }}
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
      </Box>
    </Box>
  );
}

export default ChatArea;
