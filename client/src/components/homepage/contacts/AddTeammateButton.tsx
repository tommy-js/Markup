import React, { useContext, useEffect, useState } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { addTeammateMutation } from "../../../queries/queries";
import { userContext } from "../../../App";
import addToTeammates from "../../../icons/add_to_teammates.png";
import "../../../App.scss";

interface Props {
  name: string;
  id: number;
  userId: number;
  addTeammate: boolean;
  addTeammateMutation: (variables: object) => void;
}

const AddTeammateButton: React.FC<Props> = props => {
  const [checkTeammateEmpty, setCheckTeammateEmpty] = useState();
  const { userVal, setUserVal } = useContext(userContext);

  useEffect(() => {
    if (props.addTeammate === true) {
      addTeammate();
    }
  }, [props.addTeammate]);

  function addTeammate() {
    if (checkTeammateEmpty == false) {
      props.addTeammateMutation({
        variables: {
          userId: props.userId,
          id: props.id,
          name: props.name
        }
      });
      let newTeammate = {
        id: props.id,
        name: props.name
      };
      let arr;
      if (userVal.teammates) {
        arr = userVal.teammates;
        arr.push(newTeammate);
      } else {
        arr = [];
        arr.push(newTeammate);
      }
      setUserVal({
        username: userVal.username,
        id: userVal.id,
        friends: userVal.friends,
        projects: userVal.projects,
        teammates: arr,
        tasks: userVal.tasks
      });
    }
  }

  useEffect(() => {
    setCheckTeammateEmpty(false);
    for (let k = 0; k < userVal.teammates.length; k++) {
      if (userVal.teammates[k].id == props.id) {
        setCheckTeammateEmpty(true);
      }
    }
  }, []);

  return (
    <button className="remove_friend_button" onClick={() => addTeammate()}>
      <div className="add_to_teammates_container">
        <img className="add_to_teammates_image" src={addToTeammates} />
      </div>
    </button>
  );
};

export default compose(
  graphql(addTeammateMutation, { name: "addTeammateMutation" })
)(AddTeammateButton);
