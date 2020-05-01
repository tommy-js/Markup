import React, { useState, useEffect } from "react";
import AddUserComponent from "./AddUserComponent";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { getUsers } from "../queries/queries";
import "../App.scss";
import { flowRight as compose } from "lodash";
import { Route, BrowserRouter as Router } from "react-router-dom";

interface Props {
  allUsersQuery: () => object;
  searchVector: string;
}

const UserSearchBlock: React.FC<Props> = props => {
  const { data, loading } = useQuery(getUsers, {
    variables: { username: props.searchVector }
  });
  console.log(data);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div className="search_user_block">
        {data.getUsers.map((user: any) => (
          <AddUserComponent user={user.username} id={user.id} key={user.id} />
        ))}
      </div>
    );
  }
};

export default compose(graphql(getUsers, { name: "getUsers" }))(
  UserSearchBlock
);
