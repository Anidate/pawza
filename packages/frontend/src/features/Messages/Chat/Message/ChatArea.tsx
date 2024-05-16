import React from 'react';

function ChatArea({ chat }) {
  return (
    <div className="chat-area-container">
      <div className="chat-area-header">
        <div className="chat-icon">{chat.name[0]}</div>
        <div className="chat-info">
          <div className="chat-title">{chat.name}</div>
          <div className="chat-time-stamp">{chat.timeStamp}</div>
        </div>
      </div>
      <div className="messages-container">Messages Container</div>
      <div className="text-input-area">Text Input Area</div>
    </div>
  );
}

export default ChatArea;
