import React from "react";
import { Link } from "react-router-dom";
import RemoveFriendButton from "./RemoveFriendButton";
import AddTeammateButton from "./AddTeammateButton";
import "../../../App.scss";

interface Props {
  name: string;
  id: number;
  userId: number;
}

export const Friend: React.FC<Props> = props => {
  return (
    <div className="person_container">
      <Link className="link_to_person" to={`/home/${props.id}`}>
        <div className="person">
          <span>
            {props.name} #{props.id}
          </span>
        </div>
      </Link>
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
  );
};
