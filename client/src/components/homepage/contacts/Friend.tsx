import React, { useState } from "react";
import { Link } from "react-router-dom";
import RemoveFriendButton from "./RemoveFriendButton";
import AddTeammateButton from "./AddTeammateButton";
import "../../../App.scss";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

interface Props {
  searchingForFriends: (searching: boolean) => void;
  name: string;
  id: number;
  userId: number;
}

export const Friend: React.FC<Props> = props => {
  const [removefriend, setRemovefriend] = useState(false);

  function contextMenu() {
    return (
      <div>
        <ContextMenu id="friend_context_menu">
          <MenuItem onClick={() => setRemovefriend(true)}>
            Remove Friend
          </MenuItem>
          <MenuItem>Add to Teammates</MenuItem>
        </ContextMenu>
      </div>
    );
  }

  return (
    <div
      className="person_container"
      onClick={() => props.searchingForFriends(false)}
    >
      <ContextMenuTrigger id="friend_context_menu">
        <div className="person">
          <Link className="link_to_person" to={`/home/${props.id}`}>
            <span>
              {props.name} #{props.id}
            </span>
          </Link>
          <div className="friend_settings">
            <AddTeammateButton
              name={props.name}
              id={props.id}
              userId={props.userId}
            />
            <RemoveFriendButton
              removefriend={removefriend}
              name={props.name}
              id={props.id}
              userId={props.userId}
            />
          </div>
        </div>
      </ContextMenuTrigger>
      {contextMenu()}
    </div>
  );
};
