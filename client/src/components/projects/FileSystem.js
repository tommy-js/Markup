import React, { useState, useEffect } from "react";
import { CreateFileButton } from "./CreateFileButton";
import { OpenFiles } from "./OpenFiles";
import CreateFileForm from "./CreateFileForm";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { getProjectByIdQuery } from "../../queries/queries";

function FileSystem(props) {
  const [createFile, setCreateFile] = useState(false);
  const [getProj, { data, loading }] = useLazyQuery(getProjectByIdQuery);
  const [newProj, setNewProj] = useState();

  function addFile() {
    setCreateFile(true);
  }

  useEffect(() => {
    if (props.selectedProjectId) {
      getProj({
        variables: {
          id: props.selectedProjectId
        }
      });
    }
  }, [props.selectedProjectId]);

  useEffect(() => {
    if (data) {
      props.updateProject(data.getProjectById);
      setNewProj(data.getProjectById);
      console.log(data.getProjectById);
    }
  }, [data]);

  function addToProjects(val) {
    let newAdd = val;
    let arr = newProj.documents;
    arr.push(val);
    setNewProj(arr);
    props.updateProject(arr);
  }

  function setCreateFileFalse() {
    setCreateFile(false);
  }

  function checkForAdd() {
    if (createFile === true) {
      return (
        <div className="add_new_file_button">
          <CreateFileForm
            addFile={addFile}
            selectedProjectId={props.selectedProjectId}
            setCreateFileFalse={setCreateFileFalse}
            addToProjects={addToProjects}
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
        <OpenFiles
          selectedProject={props.selectedProject}
          projects={props.projects}
          newProj={newProj}
          documents={props.documents}
        />
      </div>
      {checkForAdd()}
    </div>
  );
}

export default compose(
  graphql(getProjectByIdQuery, { name: "getProjectByIdQuery" })
)(FileSystem);
