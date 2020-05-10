import React, { useEffect, useContext, useState } from "react";
import { Navbar } from "../navigation/Navbar";
import { userContext } from "../../App";
import { useHistory, Link, Route } from "react-router-dom";
import { loggedInContext } from "../../App";
import { ProfileSidebar } from "./ProfileSidebar";
import { UserSettings } from "./UserSettings";
import ProfileProjects from "./ProfileProjects";
import Cookies from "universal-cookie";
import { userQuery } from "../../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
const aes256 = require("aes256");

interface Props {
  adminDriller: (userProjects: any) => void;
  passedId: number;
}

const Profile: React.FC<Props> = props => {
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

  return (
    <div>
      <Navbar />
      <div className="under_header profile_block">
        <ProfileSidebar />
        <div className="profile_project_listings">
          <Route path={`/profile/settings/${userVal.id}`}>
            <UserSettings />
          </Route>
          <Route path={`/profile/projects/${userVal.id}`}>
            <ProfileProjects adminDriller={props.adminDriller} />
          </Route>
        </div>
      </div>
    </div>
  );
};

export default compose(graphql(userQuery, { name: "userQuery" }))(Profile);
