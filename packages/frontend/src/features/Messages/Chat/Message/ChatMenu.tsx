import './styles.css';

import { Box } from '@mui/material';
import { useState } from 'react';

import ChatsItem from './ChatsItem';

type Chat = {
  name: string;
  lastMessage: string;
  timeStamp: string;
};

type Message = string;

function ChatMenu() {
  const [chats, setChats] = useState<Chat[]>([
    { name: 'Test#1', lastMessage: 'last Message #1', timeStamp: 'today' },
    { name: 'Test#2', lastMessage: 'last Message #2', timeStamp: 'today' },
    { name: 'Test#3', lastMessage: 'last Message #3', timeStamp: 'today' },
  ]);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (message: Message) => {
    setMessages([...messages, message]);
  };

  return (
    <Box className="ChatApp main-container">
      <div className="sb-chats">
        <h2 className="chats-title">chats</h2>
        {chats.map((chat, index) => (
          <ChatsItem key={index} props={chat} />
        ))}
      </div>
    </Box>
  );
}

export default ChatMenu;
