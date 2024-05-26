function ChatsItem({ props }){
  return (
    <div className="chat-container">
      <div className="chat-icon">{props.name[0]}</div>
      <div className="chat-title">{props.name}</div>
      <div className="chat-last-message">{props.lastMessage}</div>
      <div className="chat-time-stamp">{props.timeStamp}</div>
    </div>
  );
}



export default ChatsItem;