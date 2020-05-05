import React from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { addTeammateMutation } from "../queries/queries";
import "../App.scss";

interface Props {
  name: string;
  id: number;
  userId: number;
  addTeammateMutation: (variables: object) => void;
}

const AddTeammateButton: React.FC<Props> = props => {
  function addTeammate() {
    props.addTeammateMutation({
      variables: {
        userId: props.userId,
        id: props.id,
        name: props.name
      }
    });
  }

  return (
    <button className="remove_friend_button" onClick={() => addTeammate()}>
      Add Teammate
    </button>
  );
};

export default compose(
  graphql(addTeammateMutation, { name: "addTeammateMutation" })
)(AddTeammateButton);
