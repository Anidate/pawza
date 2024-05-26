import React, { useState } from 'react';
import ChatArea from './ChatArea';
import SideBar from './SideBar';
import './styles.css';
import { Box } from '@mui/material';

function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const [chats] = useState([
    {
      name: 'User 1',
      timeStamp: 'today',
    },
    {
      name: 'User 2',
      timeStamp: 'today',
    },
  ]);

  const handleSendMessage = message => {
    setMessages([...messages, message]);
  };

  return (
    <Box className="ChatApp main-container">
      <SideBar />
      <ChatArea chat={chats[1]} messages={messages} onSendMessage={handleSendMessage} />
    </Box>
  );
}

export default ChatContainer;
