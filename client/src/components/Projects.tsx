import React, { useState } from "react";
import OpenProject from "./OpenProject";
import { Navbar } from "./Navbar";
import { SideSearchBar } from "./SideSearchBar";
import "../App.scss";

interface Props {
  routeDriller: (projects: object) => void;
}

export const Projects: React.FC<Props> = props => {
  const [searchSettings, setSearchSettings] = useState<any>();

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
