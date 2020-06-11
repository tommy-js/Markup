import React, { useState, useContext, useEffect } from "react";
import OpenProject from "./OpenProject.js";
import { Navbar } from "../navigation/Navbar";
import { SideSearchBar } from "./SideSearchBar";
import { userContext } from "../../App";
import { useHistory } from "react-router-dom";
import "../../App.scss";
import Cookies from "universal-cookie";
import { userQuery } from "../../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { loggedInContext } from "../../App";
const aes256 = require("aes256");

function Projects(props) {
  const [searchSettings, setSearchSettings] = useState("");
  const { userVal, setUserVal } = useContext(userContext);
  const history = useHistory();
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);
  const [passInUser, { data, loading }] = useLazyQuery(userQuery);
  const cookies = new Cookies();

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

  function setSearch(submittedStack) {
    setSearchSettings(submittedStack);
  }

  return (
    <div className="project_main">
      <Navbar />
      <div className="under_header_projects">
        <h1 className="project_header">Open Projects</h1>
        <div className="under_carriage">
          <SideSearchBar setSearch={setSearch} />
          <OpenProject
            searchSettings={searchSettings}
            routeDriller={props.routeDriller}
          />
        </div>
      </div>
    </div>
  );
}

export default compose(graphql(userQuery, { name: "userQuery" }))(Projects);
