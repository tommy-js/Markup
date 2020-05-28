import React, { useState, useContext, useEffect } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { getFriendRequestsQuery } from "../../queries/queries";
import { userContext } from "../../App";
import accept from "../../icons/accept.png";
import decline from "../../icons/decline.png";

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
          <div className="friend_request_block">
            <div className="friend_request_info">
              {el.name} #{el.fromId} <span>Sent: {el.timestamp}</span>
            </div>
            <div className="request_button_container">
              <div className="accept_button">
                <img className="button_image" src={accept} />
              </div>
              <div className="decline_button">
                <img className="button_image" src={decline} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default FriendRequest;
