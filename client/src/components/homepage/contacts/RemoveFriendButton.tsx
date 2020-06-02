import React, { useState, useEffect, useContext } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { removeFriendMutation } from "../../../queries/queries";
import { userContext } from "../../../App";
import "../../../App.scss";

interface Props {
  name: string;
  id: number;
  userId: number;
  removefriend: boolean;
  removeFriendMutation: (variables: object) => void;
}

const RemoveFriendButton: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);
  const [checkClicked, setCheckClicked] = useState(false);

  useEffect(() => {
    if (props.removefriend === true) {
      takeAwayFriend();
    }
  }, [props.removefriend]);

  function takeAwayFriend() {
    let arr = userVal.friends.find((el: any) => el.id === props.id);
    let found = userVal.friends.indexOf(arr);
    let staticArr = userVal.friends;
    staticArr.splice(found, 1);
    setUserVal({
      username: userVal.username,
      id: userVal.id,
      friends: staticArr,
      projects: userVal.projects
    });
    props.removeFriendMutation({
      variables: {
        userId: props.userId,
        id: props.id
      }
    });
  }

  function xOut() {
    if (checkClicked === true) {
      return (
        <div>
          <button onClick={() => takeAwayFriend()}>Are you sure?</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={() => setCheckClicked(true)}>x</button>
        </div>
      );
    }
  }

  return <div className="remove_friend_button">{xOut()}</div>;
};

export default compose(
  graphql(removeFriendMutation, { name: "removeFriendMutation" })
)(RemoveFriendButton);
