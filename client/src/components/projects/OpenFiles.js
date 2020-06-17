import React, { useState, useEffect } from "react";
import DocumentItem from "./DocumentItem";
import { Link } from "react-router-dom";

export function OpenFiles(props) {
  const [projects, setProjects] = useState();

  if (props.newDocs) {
    return (
      <div className="open_files_container">
        <div className="selected_project_header">
          <span>{props.selectedProject}</span>
        </div>
        {props.newDocs.map(doc => (
          <Link to={`/myprojects/documents/${doc.id}`}>
            <DocumentItem
              key={doc.id}
              title={doc.name}
              id={doc.id}
              removeFromDocs={props.removeFromDocs}
            />
          </Link>
        ))}
      </div>
    );
  } else {
    return null;
  }
}
