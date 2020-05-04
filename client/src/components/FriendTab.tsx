import React, { useContext, useEffect, useState } from "react";
import Friend from "./Friend";
import { userQuery } from "../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { userContext } from "../App";
import { friendContext } from "../App";
import "../App.scss";

interface Props {
  passFriends: (friends: any) => void;
}

const FriendTab: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);
  const { userFriends, setUserFriends } = useContext(friendContext);
  const { loading, data } = useQuery(userQuery, {
    variables: { username: userVal.username },
    pollInterval: 500
  });

  useEffect(() => {
    if (!loading) {
      setUserFriends(data.user.friends);
      props.passFriends(data.user.friends);
    }
  }, [loading]);
  console.log(userFriends);

  if (!loading) {
    return (
      <div className="friend_class_container">
        {data.user.friends.map((person: any) => (
          <Friend
            key={Math.floor(Math.random() * 10000)}
            id={person.id}
            name={person.name}
            userId={userVal.id}
          />
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
