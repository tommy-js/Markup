import React, { useContext, useEffect, useState } from "react";
import { Member } from "./Member";
import { userContext } from "../../../App";

export const TeamTab: React.FC = () => {
  const { userVal, setUserVal } = useContext(userContext);

  if (userVal.teammates.length > 0) {
    return (
      <div className="friend_class_container">
        {userVal.teammates.map((members: any) => (
          <Member name={members.name} id={members.id} userId={userVal.id} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="friend_class_container task_box">
        <p className="load_if_empty">Add teammates to start...</p>
      </div>
    );
  }
};
