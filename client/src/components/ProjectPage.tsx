import React, { useContext } from "react";
import { Navbar } from "./Navbar";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { addProjectUserMutation } from "../queries/queries";
import { userContext } from "../App";

interface Props {
  addProjectUserMutation: (variables: object) => void;
  id: number;
  title: string;
  content: string;
}

const ProjectPage: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);

  function addUserToProject() {
    let timestamp = Math.round(new Date().getTime() / 1000);
    props.addProjectUserMutation({
      variables: {
        timestamp: timestamp,
        id: props.id,
        title: props.title,
        content: props.content,
        userId: userVal.id
      }
    });
  }

  return (
    <div>
      <Navbar />
      <div className="under_header">
        <p>Project Page</p>
        <button onClick={() => addUserToProject()}>Join Project</button>
      </div>
    </div>
  );
};

export default compose(
  graphql(addProjectUserMutation, { name: "addProjectUserMutation" })
)(ProjectPage);
