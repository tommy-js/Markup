import React, { useState, useEffect } from "react";
import accept from "../../icons/accept.png";
import decline from "../../icons/decline.png";

interface Props {
  toId: number;
  fromId: number;
  name: string;
  timestamp: number;
}

export const FriendReqContainer: React.FC<Props> = props => {
  const [timepassed, setTimepassed] = useState(0);

  useEffect(() => {
    let timeNow = Math.round(new Date().getTime() / 1000);
    let subtractedTime = timeNow - props.timestamp;
    let fullTime = Math.round(subtractedTime / 60);
    setTimepassed(fullTime);
  }, []);

  return (
    <div className="friend_request_block">
      <div className="friend_request_info">
        {props.name} #{props.fromId}{" "}
        <span className="send_req_info">Sent {timepassed} minutes ago</span>
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
  );
};
