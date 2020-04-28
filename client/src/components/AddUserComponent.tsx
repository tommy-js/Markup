import React, { useState, useContext } from "react";
import { addFriendMutation } from "../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { userContext } from "../App";
import plus from "../icons/plus.png";
import "../App.scss";

interface Props {
  user: string;
  id: number;
  addFriendMutation: (variables: object) => void;
}

const AddUserComponent: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);

  function addFriend() {
    props.addFriendMutation({
      variables: {
        userId: userVal.id,
        id: props.id,
        name: props.user
      }
    });
  }

  return (
    <div className="add_user_component">
      <div>
        {props.user} #{props.id}
        <div className="add_user" onClick={() => addFriend()}>
          <img className="add_user_button" src={plus} />
        </div>
      </div>
    </div>
  );
};

export default compose(
  graphql(addFriendMutation, { name: "addFriendMutation" })
)(AddUserComponent);
