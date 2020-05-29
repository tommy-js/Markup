import React from "react";
import accept from "../../icons/accept.png";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { addFriendMutation } from "../../queries/queries";

function AcceptButton() {
  return (
    <div onClick={submitFriendAccept()}>
      <img className="button_image" src={accept} />
    </div>
  );
}

export default compose(
  graphql(addFriendMutation, { name: "addFriendMutation" })
)(AcceptButton);
