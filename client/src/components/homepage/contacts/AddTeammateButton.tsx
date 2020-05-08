import React, { useContext, useEffect, useState } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { addTeammateMutation } from "../../../queries/queries";
import { teammateContext } from "../../../App";
import "../../../App.scss";

interface Props {
  name: string;
  id: number;
  userId: number;
  addTeammateMutation: (variables: object) => void;
}

const AddTeammateButton: React.FC<Props> = props => {
  const [checkTeammateEmpty, setCheckTeammateEmpty] = useState();
  const { userTeammates, setUserTeammates } = useContext(teammateContext);
  function addTeammate() {
    if (checkTeammateEmpty == false) {
      props.addTeammateMutation({
        variables: {
          userId: props.userId,
          id: props.id,
          name: props.name
        }
      });
    }
  }

  useEffect(() => {
    setCheckTeammateEmpty(false);
    for (let k = 0; k < userTeammates.length; k++) {
      if (userTeammates[k].id == props.id) {
        setCheckTeammateEmpty(true);
      }
    }
  }, []);

  return (
    <button className="remove_friend_button" onClick={() => addTeammate()}>
      Add Teammate
    </button>
  );
};

export default compose(
  graphql(addTeammateMutation, { name: "addTeammateMutation" })
)(AddTeammateButton);
