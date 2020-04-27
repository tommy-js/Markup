import React, { useState } from "react";
import { FriendTab } from "./FriendTab";
import { TeamTab } from "./TeamTab";
import "../App.scss";

export const FriendComp: React.FC = () => {
  const [tab, setTab] = useState(true);

  if (tab) {
    return (
      <div className="person_comp">
        <div className="friend_comp">
          <button className="tab_button tab_button_right" disabled>
            Friends
          </button>
          <button
            className="tab_button tab_button_left"
            onClick={() => setTab(!tab)}
          >
            Teammates
          </button>
          <FriendTab />
        </div>
      </div>
    );
  } else {
    return (
      <div className="person_comp">
        <div className="friend_comp">
          <button
            className="tab_button tab_button_right"
            onClick={() => setTab(!tab)}
          >
            Friends
          </button>
          <button className="tab_button tab_button_left" disabled>
            Teammates
          </button>
          <TeamTab />
        </div>
      </div>
    );
  }
};
