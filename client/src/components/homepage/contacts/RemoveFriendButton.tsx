import React, { useContext } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { removeFriendMutation } from "../../../queries/queries";
import { userContext } from "../../../App";
import "../../../App.scss";

interface Props {
  name: string;
  id: number;
  userId: number;
  removeFriendMutation: (variables: object) => void;
}

const RemoveFriendButton: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);

  function takeAwayFriend() {
    let arr = userVal.friends.find((el: any) => el.id === props.id);
    let found = userVal.friends.indexOf(arr);
    userVal.friends.splice(found, 1);
    props.removeFriendMutation({
      variables: {
        userId: props.userId,
        id: props.id
      }
    });
  }

  return (
    <button className="remove_friend_button" onClick={() => takeAwayFriend()}>
      x
    </button>
  );
};

export default compose(
  graphql(removeFriendMutation, { name: "removeFriendMutation" })
)(RemoveFriendButton);
