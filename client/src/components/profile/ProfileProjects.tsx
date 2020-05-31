import React, { useState, useEffect, useContext } from "react";
import { AdminProjectListing } from "../projects/AdminProjectListing";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { userContext } from "../../App";
import Cookies from "universal-cookie";
import { useHistory, Link, Route } from "react-router-dom";
import { loggedInContext } from "../../App";
import { userQuery } from "../../queries/queries";
const aes256 = require("aes256");

interface Props {
  adminDriller: (userProjects: any) => void;
}

export const ProfileProjects: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);
  const [projects, setProjects] = useState(userVal.projects);
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);
  const [totalProj, setTotalProj] = useState();
  const [projList, setProjList] = useState();
  const history = useHistory();
  const cookies = new Cookies();

  useEffect(() => {
    if (userVal.projects) {
      let arr = userVal.projects.length;
      setTotalProj(arr);
      setProjList(`${arr}/5 projects joined`);
    }
  }, []);

  function currentProjects() {
    if (userVal.projects) {
      return (
        <div>
          {userVal.projects.map((el: any) => (
            <AdminProjectListing
              key={el.id}
              title={el.title}
              content={el.content}
              id={el.id}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <p className="center_join_project">Join a project to see it here</p>
        </div>
      );
    }
  }

  function displayList() {
    if (totalProj < 5) {
      return null;
    } else {
      return (
        <div className="full_list_block">
          <span>Project list full</span>
          <br />
          <span>Leave a project to add another</span>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="start_project_block">
        <h3 className="start_project_header">Create a project</h3>
        <div className="new_project_button">
          <Link to={`/newproject`}>
            <span className="hide_on_swipe">New Project</span>
            <div className="swipe_right">
              <span className="show_on_swipe">New Project</span>
            </div>
          </Link>
        </div>
        {displayList()}
      </div>
      <span className="project_counter">{projList}</span>
      <div className="current_projects">{currentProjects()}</div>
    </div>
  );
};
