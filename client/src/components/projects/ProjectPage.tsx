import React, { useEffect, useState, useContext } from "react";
import { Navbar } from "../navigation/Navbar";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { addProjectUserMutation } from "../../queries/queries";
import { userContext } from "../../App";

interface Props {
  addProjectUserMutation: (variables: object) => void;
  id: number;
  title: string;
  content: string;
  leadId: number;
  leadName: string;
}

const ProjectPage: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);
  const [member, setMember] = useState(false);

  useEffect(() => {
    let findData = userVal.projects.find((el: any) => el.id === props.id);
    if (findData) {
      setMember(true);
    }
  }, []);

  function addUserToProject() {
    let arr = userVal.projects;
    if (arr.length < 5) {
      let timestamp = Math.round(new Date().getTime() / 1000);
      setMember(true);
      props.addProjectUserMutation({
        variables: {
          timestamp: timestamp,
          id: props.id,
          title: props.title,
          content: props.content,
          userId: userVal.id
        }
      });
      arr.push({
        timestamp: timestamp,
        id: props.id,
        title: props.title,
        content: props.content
      });
      setUserVal({
        username: userVal.username,
        id: userVal.id,
        friends: userVal.friends,
        projects: arr
      });
    }
  }

  function checkMember() {
    if (member) {
      return (
        <div>
          <p>You're already a member of this group.</p>
          <button>Back to profile</button>
        </div>
      );
    } else {
      return <button onClick={() => addUserToProject()}>Join Project</button>;
    }
  }

  return (
    <div>
      <div className="project_page">
        <p>{props.title}</p>
        <p>{props.content}</p>
        <p>Project Lead: {props.leadName}</p>
        {checkMember()}
      </div>
    </div>
  );
};

export default compose(
  graphql(addProjectUserMutation, { name: "addProjectUserMutation" })
)(ProjectPage);
