import React, { useContext } from "react";
import accept from "../../icons/accept.png";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { addFriendMutation } from "../../queries/queries";
import { userContext } from "../../App";

function AcceptButton(props) {
  const { userVal, setUserVal } = useContext(userContext);

  function submitFriendAccept() {
    let addingUser = { id: props.from, name: props.name };
    userVal.friends.push(addingUser);
    props
      .addFriendMutation({
        variables: {
          userId: userVal.id,
          id: props.from,
          name: props.name
        }
      })
      .then(
        props.addFriendMutation({
          variables: {
            userId: props.from,
            id: userVal.id,
            name: userVal.username
          }
        })
      );
    props.dropFriendRequest(props.from, userVal.id);
  }

  return (
    <div onClick={() => submitFriendAccept()}>
      <img className="button_image" src={accept} />
    </div>
  );
}

export default compose(
  graphql(addFriendMutation, { name: "addFriendMutation" })
)(AcceptButton);
