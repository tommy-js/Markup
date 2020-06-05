import React, { useContext } from "react";
import { FriendComp } from "./FriendComp";
import { userContext } from "../../../App";
import { FriendSearch } from "./FriendSearch";
import "../../../App.scss";

interface Props {
  searchingForFriends: (searching: boolean) => void;
  passFriends: (friends: any) => void;
}

export const FriendList: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);

  return (
    <div className="friend_list">
      <FriendComp
        searchingForFriends={props.searchingForFriends}
        passFriends={props.passFriends}
      />
      <FriendSearch searchingForFriends={props.searchingForFriends} />
    </div>
  );
};
