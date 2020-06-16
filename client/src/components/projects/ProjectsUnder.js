import React, { useState, useEffect } from "react";
import { getDocumentsByProjectQuery } from "../../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { ProjectOptionsMenu } from "./ProjectOptionsMenu";
import { CenterContainer } from "./CenterContainer";
import FileSystem from "./FileSystem";

function ProjectsUnder(props) {
  const [getDocs, { data, loading }] = useLazyQuery(getDocumentsByProjectQuery);
  const [documents, setDocuments] = useState();

  useEffect(() => {
    if (props.selectedProjectId) {
      console.log(props.selectedProjectId);
      getDocs({
        variables: {
          projectId: props.selectedProjectId
        }
      });
    }
  }, [props.selectedProjectId]);

  useEffect(() => {
    console.log("logged passed data");
    if (data) {
      setDocuments(data.documents);
      console.log("documents: ");
      console.log(data.documents);
    }
  }, [data]);

  return (
    <div>
      <div className="inline_container third_left">
        <ProjectOptionsMenu />
      </div>
      <div className="inline_container third_center">
        <CenterContainer
          updatedProj={props.updatedProj}
          documents={documents}
        />
      </div>
      <div className="inline_container third_right">
        <FileSystem
          projects={props.userVal.projects}
          selectedProject={props.selectedProject}
          selectedProjectId={props.selectedProjectId}
          updateProject={props.updateProject}
          documents={documents}
        />
      </div>
    </div>
  );
}

export default compose(
  graphql(getDocumentsByProjectQuery, { name: "getProjectByIdQuery" })
)(ProjectsUnder);
