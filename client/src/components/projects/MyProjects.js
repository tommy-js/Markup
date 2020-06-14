import React, { useContext, useState, useEffect } from "react";
import { ProjectOptionsMenu } from "./ProjectOptionsMenu";
import { CenterContainer } from "./CenterContainer";
import { FileSystem } from "./FileSystem";
import { Navbar } from "../navigation/Navbar.tsx";
import { HiddenDropdown } from "./HiddenDropdown";
import { loggedInContext } from "../../App";
import { useHistory } from "react-router-dom";
import { userQuery } from "../../queries/queries";
import { userContext } from "../../App";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import Cookies from "universal-cookie";
const aes256 = require("aes256");

function MyProjects() {
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);
  const history = useHistory();
  const { userVal, setUserVal } = useContext(userContext);
  const [decrypt, setDecrypt] = useState();
  const [passInUser, { data, loading }] = useLazyQuery(userQuery);
  const cookies = new Cookies();
  const [selectedProject, setSelectedProject] = useState();

  useEffect(() => {
    if (!loggedIn) {
      if (cookies.get("SESS_ID") && cookies.get("SESS_KEY")) {
        let sessionid = cookies.get("SESS_ID");
        let key = cookies.get("SESS_KEY").toString();
        let dec = aes256.decrypt(key, sessionid);
        let loweredDec = dec.toLowerCase();
        passInUser({
          variables: {
            username: loweredDec,
            id: key
          }
        });
        setLoggedIn(true);
      } else {
        let path = "/";
        history.push(path);
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      setUserVal({
        username: data.user.username,
        id: data.user.id,
        friends: data.user.friends,
        projects: data.user.projects,
        teammates: data.user.teammates,
        tasks: data.user.tasks,
        conversations: data.user.conversations,
        friendrequests: data.user.friendrequests
      });
    }
  }, [data]);

  function keepSelectedProject(val) {
    setSelectedProject(val);
  }

  if (userVal.projects) {
    return (
      <div className="project_page">
        <Navbar />
        <div className="fixed_under">
          <HiddenDropdown
            projects={userVal.projects}
            keepSelectedProject={keepSelectedProject}
          />
          <div className="inline_container third_left">
            <ProjectOptionsMenu />
          </div>
          <div className="inline_container third_center">
            <CenterContainer />
          </div>
          <div className="inline_container third_right">
            <FileSystem selectedProject={selectedProject} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default compose(graphql(userQuery, { name: "userQuery" }))(MyProjects);
