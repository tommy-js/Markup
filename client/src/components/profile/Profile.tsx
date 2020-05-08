import React, { useEffect, useContext, useState } from "react";
import { Navbar } from "../navigation/Navbar";
import { userContext } from "../../App";
import { useHistory, Link, Route } from "react-router-dom";
import { ProfileSidebar } from "./ProfileSidebar";
import { UserSettings } from "./UserSettings";
import ProfileProjects from "./ProfileProjects";

interface Props {
  adminDriller: (userProjects: any) => void;
  passedId: number;
}

export const Profile: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);
  const history = useHistory();

  useEffect(() => {
    let path = "/";
    if (props.passedId != userVal.id) {
      history.push(path);
    }
    if (!userVal.username) {
      history.push(path);
    }
  });

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
