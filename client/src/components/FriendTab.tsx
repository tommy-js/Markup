import React, { useContext, useEffect, useState } from "react";
import { Friend } from "./Friend";
import { userQuery } from "../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { userContext } from "../App";
import "../App.scss";

interface Props {
  passFriends: (friends: any) => void;
}

const FriendTab: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);
  const { loading, data } = useQuery(userQuery, {
    variables: { username: userVal.username }
  });
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (!loading) {
      setFriends(data.user.friends);
      props.passFriends(data.user.friends);
    }
  }, [loading]);

  if (!loading) {
    return (
      <div>
        {friends.map((person: any) => (
          <Friend
            key={Math.floor(Math.random() * 10000)}
            id={person.id}
            name={person.name}
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
