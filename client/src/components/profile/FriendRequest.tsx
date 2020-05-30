import React, { useState, useContext, useEffect } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { getFriendRequestsQuery } from "../../queries/queries";
import { userContext } from "../../App";
import FriendReqContainer from "./FriendReqContainer";

export const FriendRequest: React.FC = () => {
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

  return (
    <div className="friend_request">
      <h1 className="recent_req_header">Recent Friend Requests</h1>
      {friendRequests.map((el: any) => (
        <FriendReqContainer
          name={el.name}
          toId={el.toId}
          fromId={el.fromId}
          timestamp={el.timestamp}
        />
      ))}
    </div>
  );
};
