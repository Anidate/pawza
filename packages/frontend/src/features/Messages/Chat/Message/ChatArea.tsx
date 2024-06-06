import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMessages, sendMessage } from '../../../../api/chat-messages';
import { useAuth } from '../../../Auth/useAuth';

interface Message {
  _id: string;
  content: string;
  timestamp: string;
  author: { email: string };
}

function ChatArea({ chatId }: { chatId: string }) {
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  const currentUserEmail = user?.email;

  // Fetch messages using useQuery
  const { data: messages = [], isLoading, error } = useQuery<Message[]>({
    queryKey: ['messages', chatId],
    queryFn: () => fetchMessages(chatId),
  });

  // Mutation for sending a message
  const mutation = useMutation({
    mutationFn: ({ chatId, content }: { chatId: string; content: string }) => sendMessage(chatId, content),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['messages', chatId]);
    },
    onError: (error) => {
      console.error('Error sending message:', error);
    },
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      try {
        await mutation.mutateAsync({ chatId, content: newMessage });
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box className="chat-area-container" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F5F5F5' }}>
      <Box
        className="messages-container"
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        {messages.map((message) => (
          <Box
            key={message._id}
            className="message"
            sx={{
              alignSelf: message.author.email === currentUserEmail ? 'flex-end' : 'flex-start',
              maxWidth: '60%',
              padding: '1rem',
              borderRadius: '1rem',
              backgroundColor: message.author.email === currentUserEmail ? '#DCF8C6' : '#FFF',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              wordBreak: 'break-word',
              marginBottom: '1rem',
            }}
          >
            {message.content}
          </Box>
        ))}
      </Box>
      <Box component="form" className="text-input-area" onSubmit={handleSendMessage} display="flex" gap="1rem" sx={{ padding: '1rem', backgroundColor: '#FFF', boxShadow: '0 -1px 3px rgba(0,0,0,0.1)', borderTop: '1px solid #E0E0E0' }}>
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
