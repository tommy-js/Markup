import React, { useState } from "react";
import { FriendTab } from "./FriendTab";
import TeamTab from "./TeamTab";
import "../../../App.scss";

interface Props {
  searchingForFriends: (searching: boolean) => void;
  passFriends: (friends: any) => void;
}

export const FriendComp: React.FC<Props> = props => {
  const [tab, setTab] = useState(true);
  const [friend, setFriends] = useState([]);
  const [leftBorderSelected, setLeftBorderSelected] = useState("none");
  const [rightBorderSelected, setRightBorderSelected] = useState(
    "1px solid grey"
  );

  if (tab) {
    return (
      <div className="person_comp">
        <div className="friend_comp">
          <button className="tab_button tab_button_right" disabled>
            Friends
          </button>
          <button
            className="tab_button tab_button_left"
            style={{ borderBottom: leftBorderSelected }}
            onClick={() => setTab(!tab)}
          >
            Teammates
          </button>
          <FriendTab
            passFriends={props.passFriends}
            searchingForFriends={props.searchingForFriends}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="person_comp">
        <div className="friend_comp">
          <button
            className="tab_button tab_button_right"
            style={{ borderBottom: rightBorderSelected }}
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
