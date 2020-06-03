import React, { useContext } from "react";
import accept from "../../icons/accept.png";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { addFriendMutation } from "../../queries/queries";
import { userContext } from "../../App";

function AcceptButton(props) {
  const { userVal, setUserVal } = useContext(userContext);

  function submitFriendAccept() {
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
    let arr;
    let pushFriend = { id: props.from, name: props.name };
    if (userVal.friends) {
      let arr = userVal.friends;
      arr.push(pushFriend);
    } else {
      let arr = [];
      arr.push(pushFriend);
    }
    console.log(arr);
    setUserVal({
      username: userVal.username,
      id: userVal.id,
      friends: arr,
      projects: userVal.projects,
      tasks: userVal.tasks,
      teammates: userVal.teammates
    });
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
