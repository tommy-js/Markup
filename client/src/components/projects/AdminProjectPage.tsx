import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "../navigation/Navbar";
import { loggedInContext } from "../../App";
import { userContext } from "../../App";
import Cookies from "universal-cookie";
import { removeProjectMutation } from "../../queries/queries";
import { useHistory } from "react-router-dom";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
const aes256 = require("aes256");

interface Props {
  id: number;
  title: string;
  content: string;
  removeProjectMutation: (variables: object) => void;
}

const AdminProjectPage: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);
  const cookies = new Cookies();
  const history = useHistory();
  const [getConfirmation, setConfirmation] = useState();

  function confirmation() {
    if (getConfirmation === true) {
      console.log(props.id);
      console.log(userVal.id);
      return (
        <div className="are_you_sure">
          <button onClick={() => leaveProject()}>Yes</button>
        </div>
      );
    } else {
      return null;
    }
  }

  function leaveProject() {
    let el = userVal.projects.find((el: any) => el.id === props.id);
    let foundVal = userVal.projects.indexOf(el);
    let newArray = userVal.projects;
    newArray.splice(foundVal, 1);
    setUserVal({
      username: userVal.username,
      id: userVal.id,
      friends: userVal.friends,
      projects: newArray
    });
    props.removeProjectMutation({
      variables: {
        userId: userVal.id,
        id: props.id
      }
    });
  }

  return (
    <div className="profile_block">
      <div className="profile_project_listings">
        <Navbar />
        <div>
          <p>{props.title}</p>
          <p>{props.content}</p>
          <p>You're contributing to this project</p>
          <button onClick={() => setConfirmation(!getConfirmation)}>
            Leave Project
          </button>
          {confirmation()}
        </div>
      </div>
    </div>
  );
};

export default compose(
  graphql(removeProjectMutation, { name: "removeProjectMutation" })
)(AdminProjectPage);
