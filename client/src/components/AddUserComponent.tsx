import React, { useState, useContext, useEffect } from "react";
import { addFriendMutation } from "../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { userContext } from "../App";
import { friendContext } from "../App";
import plus from "../icons/plus.png";
import "../App.scss";

interface Props {
  user: string;
  id: number;
  addFriendMutation: (variables: object) => void;
}

const AddUserComponent: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);
  const { userFriends, setUserFriends } = useContext(friendContext);
  const [addDisplay, setAddDisplay] = useState("inline-block");
  const [checkUser, setCheckUser] = useState(false);
  const [selfDisplay, setSelfDisplay] = useState("block");

  function addFriend() {
    if (!checkUser) {
      props.addFriendMutation({
        variables: {
          userId: userVal.id,
          id: props.id,
          name: props.user
        }
      });
      setAddDisplay("none");
    }
  }

  function checkPerson() {
    if (userVal.id === props.id) {
      return (
        <div>
          {props.user} #{props.id}
          <div className="self_user">You</div>
        </div>
      );
      setSelfDisplay("none");
    } else {
      return (
        <div>
          {props.user} #{props.id}
          <div
            style={{ display: addDisplay }}
            className="add_user"
            onClick={() => addFriend()}
          >
            <img className="add_user_button" src={plus} />
          </div>
        </div>
      );
    }
  }

  useEffect(() => {
    let checkId = props.id.toString();
    let checkForUser = false;
    for (let k = 0; k < userFriends.length; k++) {
      if (userFriends[k].id === checkId) {
        checkForUser = true;
      }
    }
    if (checkForUser) {
      setAddDisplay("none");
    } else {
      setAddDisplay("inline-block");
    }
    setCheckUser(checkForUser);
  }, [userFriends]);

  return (
    <div style={{ display: selfDisplay }} className="add_user_component">
      {checkPerson()}
    </div>
  );
};

export default compose(
  graphql(addFriendMutation, { name: "addFriendMutation" })
)(AddUserComponent);
