import ChatArea from "./ChatArea";
import SideBar from "./SideBar";
import "./styles.css"

function ChatContainer() {
  const chats = [
    {
      name: "Test#1",
      lastMessage: "last Message #1",
      timeStamp: "today",
    },
    {
      name: "Test#2",
      lastMessage: "last Message #2",
      timeStamp: "today",
    },
    {
      name: "Test#3",
      lastMessage: "last Message #3",
      timeStamp: "today",
    },
  ];

  return (
    <div className="main-container">
      <SideBar />
      <ChatArea chat={chats[0]} />
    </div>
  );
}

export default ChatContainer;
