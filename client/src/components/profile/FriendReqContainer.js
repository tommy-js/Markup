import React, { useState, useEffect } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import AcceptButton from "./AcceptButton.js";
import { DeclineButton } from "./DeclineButton";
import { removeFriendRequestMutation } from "../../queries/queries";

const FriendReqContainer = props => {
  const [timepassed, setTimepassed] = useState(0);

  useEffect(() => {
    let timeNow = Math.round(new Date().getTime() / 1000);
    let subtractedTime = timeNow - props.timestamp;
    let fullTime = Math.round(subtractedTime / 60);
    setTimepassed(fullTime);
  }, []);

  function dropFriendRequest(from, to) {
    props.removeFriendRequestMutation({
      variables: {
        fromId: from,
        toId: to
      }
    });
  }

  return (
    <div className="friend_request_block">
      <div className="friend_request_info">
        {props.name} #{props.fromId}
        <span className="send_req_info"> Sent {timepassed} minutes ago</span>
      </div>
      <div className="request_button_container">
        <div className="accept_button">
          <AcceptButton
            dropFriendRequest={dropFriendRequest}
            from={props.fromId}
            name={props.name}
          />
        </div>
        <div className="decline_button">
          <DeclineButton
            dropFriendRequest={dropFriendRequest}
            from={props.fromId}
          />
        </div>
      </div>
    </div>
  );
};

export default compose(
  graphql(removeFriendRequestMutation, { name: "removeFriendRequestMutation" })
)(FriendReqContainer);
