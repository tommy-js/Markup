import React from "react";
import { FriendList } from "./FriendList";
import { MessageViewer } from "./MessageViewer";
import { TaskList } from "./TaskList";
import "../App.scss";

export const HomePage: React.FC = () => {
  return (
    <div className="home_page">
      <FriendList />
      <MessageViewer />
      <TaskList />
    </div>
  );
};
