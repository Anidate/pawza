import "./styles.css"
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material";
import ChatsItem from "./ChatsItem";
function SideBar() {
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
      <ChatsItem />
    </div>
    </div>
    </>
  );
}

export default SideBar;
