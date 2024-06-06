import { Link } from '@tanstack/react-router';
import './styles.css';

type Props = {
  name: string;
  lastMessage: string;
  timeStamp: string;
  to: string;
};

function ChatsItem({ props }: { props: Props }) {
  return (
    <Link to={props.to} className="chat-container">
      <div className="chat-icon">{props.name[0]}</div>
      <div className="chat-title">{props.name}</div>
      <div className="chat-last-message">{props.lastMessage}</div>
      <div className="chat-time-stamp">{props.timeStamp}</div>
    </Link>
  );
}

export default ChatsItem;
