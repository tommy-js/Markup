import React, { useContext } from "react";
import decline from "../../icons/decline.png";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { pullFriendRequestFromUser } from "../../queries/queries";
import { userContext } from "../../App";

interface Props {
  dropFriendRequest: (from: number, to: number) => void;
  pullFriendRequestFromUser: (variables: object) => void;
  from: number;
}

const DeclineButton: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);

  function dropFriendRequest() {
    props.pullFriendRequestFromUser({
      variables: {
        userId: props.from,
        id: userVal.id
      }
    });
    props.dropFriendRequest(props.from, userVal.id);
  }

  return (
    <div onClick={() => props.dropFriendRequest(props.from, userVal.id)}>
      <img className="button_image" src={decline} />
    </div>
  );
};

export default compose(
  graphql(pullFriendRequestFromUser, { name: "pullFriendRequestFromUser" })
)(DeclineButton);
