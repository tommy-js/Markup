import React from "react";
import { Link } from "react-router-dom";
import RemoveFriendButton from "./RemoveFriendButton";
import AddTeammateButton from "./AddTeammateButton";
import "../../../App.scss";

interface Props {
  searchingForFriends: (searching: boolean) => void;
  name: string;
  id: number;
  userId: number;
}

export const Friend: React.FC<Props> = props => {
  return (
    <div
      className="person_container"
      onClick={() => props.searchingForFriends(false)}
    >
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
            name={props.name}
            id={props.id}
            userId={props.userId}
          />
        </div>
      </div>
    </div>
  );
};
