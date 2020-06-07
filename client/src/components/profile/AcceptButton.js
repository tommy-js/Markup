import React, { useState, useContext } from "react";
import accept from "../../icons/accept.png";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import {
  addFriendMutation,
  createConversationQuery,
  addConversationToUser
} from "../../queries/queries";
import { userContext } from "../../App";

function AcceptButton(props) {
  const { userVal, setUserVal } = useContext(userContext);

  const grouped = () => {};

  function submitFriendAccept() {
    const addedId = Math.floor(Math.random() * 100000000);
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
      )
      .then(
        props
          .createConversationQuery({
            variables: {
              id: addedId,
              userId: userVal.id,
              secondId: props.from
            }
          })
          .then(
            props.addConversationToUser({
              variables: {
                id: addedId,
                userId: userVal.id,
                to: props.from
              }
            })
          )
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
      teammates: userVal.teammates,
      conversations: userVal.conversations
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
  graphql(addFriendMutation, { name: "addFriendMutation" }),
  graphql(createConversationQuery, { name: "createConversationQuery" }),
  graphql(addConversationToUser, { name: "addConversationToUser" })
)(AcceptButton);
