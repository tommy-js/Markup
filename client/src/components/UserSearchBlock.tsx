import React, { useState, useEffect } from "react";
import AddUserComponent from "./AddUserComponent";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { allUsersQuery } from "../queries/queries";
import "../App.scss";
import { flowRight as compose } from "lodash";

interface Props {
  allUsersQuery: () => object;
}

const UserSearchBlock: React.FC<Props> = props => {
  const { data, loading } = useQuery(allUsersQuery);
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
        {data.users.map((user: any) => (
          <AddUserComponent user={user.username} id={user.id} key={user.id} />
        ))}
      </div>
    );
  }
};

export default compose(graphql(allUsersQuery, { name: "allUsersQuery" }))(
  UserSearchBlock
);
