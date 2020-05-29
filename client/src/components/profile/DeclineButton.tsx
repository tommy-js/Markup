import React, { useContext } from "react";
import decline from "../../icons/decline.png";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { removeFriendRequestMutation } from "../../queries/queries";
import { userContext } from "../../App";

interface Props {
  removeFriendRequestMutation: (variables: object) => void;
  from: number;
}

const DeclineButton: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);

  function dropFriendReq() {
    props.removeFriendRequestMutation({
      variables: {
        fromId: props.from,
        toId: userVal.id
      }
    });
  }

  return (
    <div onClick={() => dropFriendReq()}>
      <img className="button_image" src={decline} />
    </div>
  );
};

export default compose(
  graphql(removeFriendRequestMutation, { name: "removeFriendRequestMutation" })
)(DeclineButton);
