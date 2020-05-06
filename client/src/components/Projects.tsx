import React from "react";
import { OpenProject } from "./OpenProject";
import { Navbar } from "./Navbar";
import { SideSearchBar } from "./SideSearchBar";
import "../App.scss";

export const Projects: React.FC = () => {
  return (
    <div className="project_main">
      <Navbar />
      <div className="under_header">
        <h1 className="project_header">Open Projects</h1>
        <div className="under_carriage">
          <SideSearchBar />
          <OpenProject />
        </div>
      </div>
    </div>
  );
};
