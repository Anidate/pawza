import { Box, Button, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react';

function ChatArea({ chat, messages, onSendMessage }: any) {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <Box className="chat-area-container">
      <Box className="chat-area-header">
        <Box className="chat-icon">{chat.name[0]}</Box>
        <Box className="chat-info">
          <Box className="chat-title">{chat.name}</Box>
          <Box className="chat-time-stamp">{chat.timeStamp}</Box>
        </Box>
      </Box>
      <Box className="messages-container">
        {messages.map((message: any) => (
          // eslint-disable-next-line react/jsx-key
          <Box className="message">{message}</Box>
        ))}
      </Box>
      <Box
        component="form"
        className="text-input-area"
        onSubmit={handleSendMessage}
        display="flex"
        gap="1rem"
      >
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
              <IconButton onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            ),
          }}
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
      </Box>
    </Box>
  );
}

export default ChatArea;
