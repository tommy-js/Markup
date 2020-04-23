import React from "react";
import { FriendComp } from "./FriendComp";
import "../App.scss";

export const FriendList: React.FC = () => {
  return (
    <div className="friend_list">
      <h1 className="friend_list_header">Friend List</h1>
      <FriendComp />
    </div>
  );
};
