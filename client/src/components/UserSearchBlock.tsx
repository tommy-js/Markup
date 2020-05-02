import React, { useState, useEffect } from "react";
import AddUserComponent from "./AddUserComponent";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { getUsers } from "../queries/queries";
import "../App.scss";
import { flowRight as compose } from "lodash";
import { Route, BrowserRouter as Router } from "react-router-dom";

interface Props {
  allUsersQuery: () => object;
}

const UserSearchBlock: React.FC<Props> = props => {
  const [searchVector, setSearchVector] = useState("");
  const [searchUser, { data, loading }] = useLazyQuery(getUsers);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setUsers(data.getUsers);
    }
  }, [data]);

  function passinSearchParam() {
    searchUser({ variables: { username: searchVector } });
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
        />
        <button
          className="user_search_button"
          onClick={() => passinSearchParam()}
        >
          Search
        </button>
      </div>
      {users.map((user: any) => (
        <AddUserComponent user={user.username} id={user.id} key={user.id} />
      ))}
    </div>
  );
};

export default compose(graphql(getUsers, { name: "getUsers" }))(
  UserSearchBlock
);
