import React, { useState } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { getFriendRequestsQuery } from "../../queries/queries";

const FriendRequest: React.FC = () => {
  const { data, loading, error } = useQuery(getFriendRequestsQuery, {
    pollInterval: 500
  });
  const [friendRequests, setFriendRequests] = useState(data.frreq);

  return (
    <div className="friend_request">
      {friendRequests.map((el: any) => (
        <div>{el.name}</div>
      ))}
    </div>
  );
};

export default FriendRequest;
