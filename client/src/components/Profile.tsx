import React, { useContext, useState } from "react";
import { Navbar } from "./Navbar";
import { userContext } from "../App";

export const Profile: React.FC = () => {
  const [projects, setProjects] = useState();
  const { userVal, setUserVal } = useContext(userContext);

  function currentProjects() {
    if (projects) {
      return (
        <div>
          <p>Your Projects</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Join a project to see it here</p>
        </div>
      );
    }
  }

  return (
    <div>
      <Navbar />
      <div className="under_header profile_block">
        <h2>Your Profile</h2>
        <h3>
          {userVal.username} #{userVal.id}
        </h3>
        <div>{currentProjects()}</div>
      </div>
    </div>
  );
};
