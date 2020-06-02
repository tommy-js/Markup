import React, { useEffect, useContext } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { removeTeammateMutation } from "../../../queries/queries";
import "../../../App.scss";
import { userContext } from "../../../App";

interface Props {
  name: string;
  id: number;
  userId: number;
  removeTeammate: boolean;
  removeTeammateMutation: (variables: object) => void;
}

const RemoveTeammateButton: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);

  useEffect(() => {
    if (props.removeTeammate === true) {
      takeAwayTeammate();
    }
  }, [props.removeTeammate]);

  function takeAwayTeammate() {
    let arr = userVal.teammates.find((el: any) => el.id === props.id);
    let found = userVal.teammates.indexOf(arr);
    let staticArr = userVal.teammates;
    staticArr.splice(found, 1);
    setUserVal({
      username: userVal.username,
      id: userVal.id,
      teammates: staticArr,
      friends: userVal.friends,
      projects: userVal.projects,
      tasks: userVal.tasks
    });
    props.removeTeammateMutation({
      variables: {
        userId: props.userId,
        id: props.id
      }
    });
  }

  return (
    <button className="remove_friend_button" onClick={() => takeAwayTeammate()}>
      x
    </button>
  );
};

export default compose(
  graphql(removeTeammateMutation, { name: "removeTeammateMutation" })
)(RemoveTeammateButton);
