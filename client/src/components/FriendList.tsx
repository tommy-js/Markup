import React, { useContext } from "react";
import { FriendComp } from "./FriendComp";
import { userContext } from "../App";
import { FriendSearch } from "./FriendSearch";
import { ProfileAccessor } from "./ProfileAccessor";
import "../App.scss";

interface Props {
  searchingForFriends: () => void;
  passFriends: (friends: any) => void;
}

export const FriendList: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);

  return (
    <div className="friend_list">
      <FriendComp passFriends={props.passFriends} />
      <FriendSearch searchingForFriends={props.searchingForFriends} />
      <ProfileAccessor profileName={userVal.username} />
    </div>
  );
};
