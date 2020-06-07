import React, { useState, useEffect } from "react";
import AddUserComponent from "./AddUserComponent.js";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { getUsers } from "../../../queries/queries";
import { flowRight as compose } from "lodash";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "../../../App.scss";
import search from "../../../icons/search.png";

function UserSearchBlock(props) {
  const [searchVector, setSearchVector] = useState("");
  const [searchUser, { data, loading }] = useLazyQuery(getUsers);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setUsers(data.getUsers);
    }
  }, [data]);

  function setPassin(e) {
    if (e.key === "Enter") {
      passinSearchParam();
    }
  }

  function passinSearchParam() {
    searchUser({ variables: { username: searchVector.toLowerCase() } });
  }

  function returnResults() {
    if (users.length > 0) {
      return (
        <div>
          {users.map(user => (
            <AddUserComponent user={user.username} id={user.id} key={user.id} />
          ))}
        </div>
      );
    } else {
      return <div className="user_search_none_found">Nothing Found</div>;
    }
  }

  return (
    <div className="search_user_block">
      <div className="search_user_input_block">
        <input
          type="text"
          placeholder="search"
          className="user_search_input"
          value={searchVector}
          onChange={e => setSearchVector(e.target.value)}
          onKeyDown={e => setPassin(e)}
        />
        <div className="search_image_block" onClick={() => passinSearchParam()}>
          <img src={search} className="search_image" />
        </div>
      </div>
      {returnResults()}
    </div>
  );
}

export default compose(graphql(getUsers, { name: "getUsers" }))(
  UserSearchBlock
);
