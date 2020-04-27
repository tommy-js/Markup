import React, { useState } from "react";
import "../App.scss";

interface Props {
  searchingForFriends: () => void;
}

export const FriendSearch: React.FC<Props> = props => {
  const [entry, setEntry] = useState("");

  function searchFriends(e: any) {
    e.preventDefault();
    setEntry("");
    props.searchingForFriends();
  }

  return (
    <div className="friend_search">
      <input
        value={entry}
        type="text"
        onChange={e => setEntry(e.target.value)}
        placeholder="Add friend... "
      />
      <button onClick={e => searchFriends(e)}>Add</button>
    </div>
  );
};
