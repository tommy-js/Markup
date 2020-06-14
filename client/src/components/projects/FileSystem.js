import React, { useState } from "react";
import { CreateFileButton } from "./CreateFileButton";
import { OpenFiles } from "./OpenFiles";
import CreateFileForm from "./CreateFileForm";

export function FileSystem(props) {
  const [createFile, setCreateFile] = useState(false);

  function addFile() {
    setCreateFile(true);
  }

  function checkForAdd() {
    if (createFile === true) {
      return (
        <div className="add_new_file_button">
          <CreateFileForm
            addFile={addFile}
            selectedProjectId={props.selectedProjectId}
          />
        </div>
      );
    } else {
      return (
        <div className="add_new_file_button">
          <CreateFileButton addFile={addFile} />
        </div>
      );
    }
  }

  return (
    <div className="file_system">
      <div className="document_file_container">
        <OpenFiles selectedProject={props.selectedProject} />
      </div>
      {checkForAdd()}
    </div>
  );
}
