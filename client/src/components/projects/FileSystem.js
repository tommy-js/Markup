import React from "react";
import CreateFileButton from "./CreateFileButton";
import { OpenFiles } from "./OpenFiles";

export function FileSystem(props) {
  return (
    <div className="file_system">
      <div className="document_file_container">
        <OpenFiles selectedProject={props.selectedProject} />
      </div>
      <div className="add_new_file_button">
        <CreateFileButton />
      </div>
    </div>
  );
}
