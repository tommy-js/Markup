import React, { useState } from "react";
import { FriendTab } from "./FriendTab";
import { TeamTab } from "./TeamTab";
import "../App.scss";

export const FriendComp: React.FC = () => {
  const [tab, setTab] = useState(true);

  if (tab) {
    return (
      <div>
        <button disabled>Friends</button>
        <button onClick={() => setTab(!tab)}>Teammates</button>
        <FriendTab />
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={() => setTab(!tab)}>Friends</button>
        <button disabled>Teammates</button>
        <TeamTab />
      </div>
    );
  }
};
