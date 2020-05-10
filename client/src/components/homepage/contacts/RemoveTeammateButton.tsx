import React from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { removeTeammateMutation } from "../../../queries/queries";
import "../../../App.scss";

interface Props {
  name: string;
  id: number;
  userId: number;
  removeTeammateMutation: (variables: object) => void;
}

const removeTeammateButton: React.FC<Props> = props => {
  function takeAwayTeammate() {
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
)(removeTeammateButton);
