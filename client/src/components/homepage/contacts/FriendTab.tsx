import React, { useContext, useEffect, useState } from "react";
import { Friend } from "./Friend";
import { userContext } from "../../../App";
import "../../../App.scss";

interface Props {
  searchingForFriends: (searching: boolean) => void;
  passFriends: (friends: any) => void;
}

export const FriendTab: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);
  const [userFriends, setUserFriends] = useState(userVal.friends);
  const [userTeammates, setUserTeammates] = useState(userVal.teammates);

  if (userFriends.length > 0) {
    return (
      <div className="friend_class_container">
        {userFriends.map((person: any) => (
          <Friend
            key={Math.floor(Math.random() * 10000)}
            id={person.id}
            name={person.name}
            userId={userVal.id}
            searchingForFriends={props.searchingForFriends}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="friend_class_container task_box">
        <p className="load_if_empty">Add friends to start...</p>
      </div>
    );
  }
};
