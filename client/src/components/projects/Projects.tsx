import React, { useState, useContext, useEffect } from "react";
import OpenProject from "./OpenProject";
import { Navbar } from "../navigation/Navbar";
import { SideSearchBar } from "./SideSearchBar";
import { userContext } from "../../App";
import { useHistory } from "react-router-dom";
import "../../App.scss";

interface Props {
  routeDriller: (projects: object) => void;
}

export const Projects: React.FC<Props> = props => {
  const [searchSettings, setSearchSettings] = useState<any>();
  const { userVal, setUserVal } = useContext(userContext);
  const history = useHistory();

  useEffect(() => {
    if (!userVal.username) {
      let path = "/";
      history.push(path);
    }
  });

  function setSearch(submittedStack: object) {
    setSearchSettings(submittedStack);
  }

  return (
    <div className="project_main">
      <Navbar />
      <div className="under_header">
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
