import React, { useState, useContext } from "react";
import addFriend from "../../../icons/add_friend.png";
import { userContext } from "../../../App";
import gear from "../../../icons/gear.png";
import "../../../App.scss";
import { Link } from "react-router-dom";

interface Props {
  searchingForFriends: (searching: boolean) => void;
}

export const FriendSearch: React.FC<Props> = props => {
  const [entry, setEntry] = useState("");
  const { userVal, setUserVal } = useContext(userContext);

  function searchFriends() {
    props.searchingForFriends(true);
  }

  return (
    <div className="friend_search">
      <div className="user_info">
        <p className="user_main_page">
          {userVal.username} #{userVal.id}
        </p>
        <Link to={`/profile/settings/${userVal.id}`}>
          <div className="user_settings">
            <img src={gear} className="user_settings_button" />
          </div>
        </Link>
      </div>
      <button className="add_friend_button" onClick={() => searchFriends()}>
        <div className="add_friend_image_container">
          <img src={addFriend} className="add_friend_image" />
        </div>
      </button>
    </div>
  );
};
