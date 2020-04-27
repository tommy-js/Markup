import React from "react";
import { Friend } from "./Friend";
import "../App.scss";

export const FriendTab: React.FC = () => {
  const friends = ["person1", "person2", "person3"];

  return (
    <div>
      {friends.map(person => (
        <Friend person={person} />
      ))}
    </div>
  );
};
