import React, { useContext, useEffect, useState } from "react";
import { Friend } from "./Friend";
import { userQuery } from "../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { userContext } from "../App";
import "../App.scss";

const FriendTab: React.FC = () => {
  const { userVal, setUserVal } = useContext(userContext);
  const [passUser, { loading, data }] = useLazyQuery(userQuery);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (userVal) {
      passUser({ variables: { username: userVal.username } });
    }
  }, []);

  useEffect(() => {
    if (data) {
      setFriends(data.user.friends);
    }
  }, [data]);

  if (friends) {
    return (
      <div>
        {friends.map(person => (
          <Friend key={Math.floor(Math.random() * 10000)} person={person} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }
};

export default compose(graphql(userQuery, { name: "userQuery" }))(FriendTab);
