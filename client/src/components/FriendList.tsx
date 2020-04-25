import React, { useContext } from "react";
import { FriendComp } from "./FriendComp";
import { userContext } from "../App";
import "../App.scss";

export const FriendList: React.FC = () => {
  const { userVal, setUserVal } = useContext(userContext);

  return (
    <div className="friend_list">
      <h1 className="friend_list_header">Friend List</h1>
      <FriendComp />

      <div>{userVal}</div>
    </div>
  );
};
