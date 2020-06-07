import React, { useState, useContext, useEffect } from "react";
import {
  addFriendRequestMutation,
  pushFriendRequestToUser
} from "../../../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { userContext } from "../../../App";
import { friendContext } from "../../../App";
import plus from "../../../icons/plus.png";
import "../../../App.scss";

function AddUserComponent(props) {
  const { userVal, setUserVal } = useContext(userContext);
  const { userFriends, setUserFriends } = useContext(friendContext);
  const [addDisplay, setAddDisplay] = useState("inline-block");
  const [requested, setRequested] = useState(false);
  const [checkUser, setCheckUser] = useState(false);
  const [selfDisplay, setSelfDisplay] = useState("block");

  useEffect(() => {
    if (userVal.friendrequests) {
      let checkFromAlreadySent = userVal.friendrequests.find(
        el => el.id === props.id
      );
      let checkToAlreadySent = userVal.friendrequests.find(
        el => el.id === userVal.id
      );
      if (checkFromAlreadySent || checkToAlreadySent) {
        setAddDisplay("none");
      }
    }
  }, []);

  function addFriend() {
    if (!checkUser) {
      let timestamp = Math.round(new Date().getTime() / 1000);
      props
        .addFriendRequestMutation({
          variables: {
            fromId: userVal.id,
            toId: props.id,
            name: userVal.username,
            timestamp: timestamp
          }
        })
        .then(
          props.pushFriendRequestToUser({
            variables: {
              userId: userVal.id,
              id: props.id
            }
          })
        )
        .then(
          props.pushFriendRequestToUser({
            variables: {
              userId: props.id,
              id: userVal.id
            }
          })
        );
      setAddDisplay("none");
    }
  }

  function checkPerson() {
    if (userVal.id === props.id) {
      return null;
    } else {
      return (
        <div className="add_user_component">
          <div>
            {props.user} #{props.id}
          </div>
          {markRequested()}
        </div>
      );
    }
  }

  function markRequested() {
    if (requested) {
      return (
        <div style={{ display: addDisplay }} className="add_user">
          <span>Request Sent</span>
        </div>
      );
    } else {
      return (
        <div
          style={{ display: addDisplay }}
          className="add_user"
          onClick={() => addFriend()}
        >
          <img className="add_user_button" src={plus} />
        </div>
      );
    }
  }

  return checkPerson();
}

export default compose(
  graphql(addFriendRequestMutation, { name: "addFriendRequestMutation" }),
  graphql(pushFriendRequestToUser, { name: "pushFriendRequestToUser" })
)(AddUserComponent);
