import React, { useState, useContext, useEffect } from "react";
import OpenProject from "./OpenProject";
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

interface Props {
  routeDriller: (projects: object) => void;
}

const Projects: React.FC<Props> = props => {
  const [searchSettings, setSearchSettings] = useState<any>();
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
      console.log("data");
      setUserVal({ username: data.user.username, id: data.user.id });
    }
  }, [data]);

  function setSearch(submittedStack: object) {
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
};

export default compose(graphql(userQuery, { name: "userQuery" }))(Projects);
