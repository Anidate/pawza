import SideBar from "./SideBar";
import WorkPlace from "./WorkPlace";
import "./styles.css"
function ChatContainer() {
  return (
    <div className="chat-container">
      <SideBar />
      <WorkPlace />
    </div>
  );
}

export default ChatContainer;
