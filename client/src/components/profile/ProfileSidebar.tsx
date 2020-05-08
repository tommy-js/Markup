import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { userContext } from "../../App";

export const ProfileSidebar: React.FC = () => {
  const { userVal, setUserVal } = useContext(userContext);

  return (
    <div className="profile_settings">
      <h2>Your Profile</h2>
      <h3>
        {userVal.username} #{userVal.id}
      </h3>
      <NavLink
        className="profile_sidebar_navlink"
        activeClassName="profile_sidebar_navlink_active"
        to={`/profile/projects/${userVal.id}`}
      >
        <div className="profile_item">Projects</div>
      </NavLink>
      <NavLink
        className="profile_sidebar_navlink"
        activeClassName="profile_sidebar_navlink_active"
        to={`/profile/settings/${userVal.id}`}
      >
        <div className="profile_item">Settings</div>
      </NavLink>
    </div>
  );
};
