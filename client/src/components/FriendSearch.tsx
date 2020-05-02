import React, { useState } from "react";
import "../App.scss";

interface Props {
  searchingForFriends: () => void;
}

export const FriendSearch: React.FC<Props> = props => {
  const [entry, setEntry] = useState("");

  function searchFriends() {
    props.searchingForFriends();
  }

  return (
    <div className="friend_search">
      <button onClick={() => searchFriends()}>Add</button>
    </div>
  );
};
