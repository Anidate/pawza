import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMessages, sendMessage } from '../../../../api/chat-messages';

interface Message {
  _id: string;
  content: string;
  timestamp: string;
}

function ChatArea({ chatId }: { chatId: string }) {
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState('');

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
    <Box className="chat-area-container">
      <Box className="messages-container">
        {messages.map((message) => (
          <Box key={message._id} className="message">
            {message.content}
          </Box>
        ))}
      </Box>
      <Box component="form" className="text-input-area" onSubmit={handleSendMessage} display="flex" gap="1rem">
        <TextField
          variant="outlined"
          sx={{
            background: 'white',
            flexGrow: 1,
            borderBottomLeftRadius: '1rem',
            borderBottomRightRadius: '1rem',
          }}
          InputProps={{
            style: { borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' },
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
