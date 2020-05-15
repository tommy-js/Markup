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

const ProfileProjects: React.FC<Props> = props => {
  const [projects, setProjects] = useState();
  const { userVal, setUserVal } = useContext(userContext);
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);
  const history = useHistory();
  const [passInUser, { data, loading }] = useLazyQuery(userQuery);
  const cookies = new Cookies();

  useEffect(() => {
    if (!loggedIn) {
      if (cookies.get("SESS_ID") && cookies.get("SESS_KEY")) {
        let sessionid = cookies.get("SESS_ID");
        let key = cookies.get("SESS_KEY").toString();
        let dec = aes256.decrypt(key, sessionid);
        passInUser({
          variables: {
            username: dec
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
      setUserVal({ username: data.user.username, id: data.user.id });
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setProjects(data.user.userprojects);
      props.adminDriller(data.user.userprojects);
    }
  }, [data]);

  function currentProjects() {
    if (projects) {
      return (
        <div>
          {projects.map((el: any) => (
            <AdminProjectListing key={el.id} title={el.title} id={el.id} />
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

  return <div>{currentProjects()}</div>;
};

export default compose(graphql(userQuery, { name: "userQuery" }))(
  ProfileProjects
);
