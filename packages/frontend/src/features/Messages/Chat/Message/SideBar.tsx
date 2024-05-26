import "./styles.css"
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material";
import ChatsItem from "./ChatsItem";
import { useState } from "react";
function SideBar() {
  const [chats, setChats] = useState([
    {name: "Test#1",
    lastMessage: "last Message #1",
    timeStamp: "today",
    },
    {name: "Test#2",
    lastMessage: "last Message #2",
    timeStamp: "today",
    },
    {name: "Test#3",
    lastMessage: "last Message #3",
    timeStamp: "today",
    },
  ]);
  return (
  <>
  <div className="sidebar-container">
    <div className="sb-search">
      <IconButton>
      <SearchIcon />
      </IconButton>
      <input placeholder="search" className="search-box"/>
    </div>
    <div className="sb-chats">
      {chats.map((chat) => {
        return <ChatsItem props={chat}/>
      })}
    </div>
    </div>
    </>
  );
}

export default SideBar;
