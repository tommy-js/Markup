import React, { useContext } from "react";
import decline from "../../icons/decline.png";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { removeFriendRequestMutation } from "../../queries/queries";
import { userContext } from "../../App";

interface Props {
  dropFriendRequest: (from: number, to: number) => void;
  from: number;
}

export const DeclineButton: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);

  return (
    <div onClick={() => props.dropFriendRequest(props.from, userVal.id)}>
      <img className="button_image" src={decline} />
    </div>
  );
};
