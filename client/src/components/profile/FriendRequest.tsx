import React, { useState, useContext, useEffect } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { getFriendRequestsQuery } from "../../queries/queries";
import { userContext } from "../../App";

const FriendRequest: React.FC = () => {
  const { userVal, setUserVal } = useContext(userContext);
  const { data, loading, error } = useQuery(getFriendRequestsQuery, {
    variables: {
      userid: userVal.id
    },
    pollInterval: 500
  });
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    if (data) {
      console.log(data.getFriendRequests);
      setFriendRequests(data.getFriendRequests);
    }
  }, [data]);

  if (!loading) {
    return (
      <div className="friend_request">
        {friendRequests.map((el: any) => (
          <div>{el.toId}</div>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default FriendRequest;
