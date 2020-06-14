import React, { useState } from "react";
import { DocumentItem } from "./DocumentItem";
import { Link } from "react-router-dom";

export function OpenFiles(props) {
  const [testingData] = useState([
    { title: "test1", id: 242 },
    { title: "test2", id: 3557 }
  ]);

  return (
    <div className="open_files_container">
      <div className="selected_project_header">
        <span>{props.selectedProject}</span>
      </div>
      {testingData.map(doc => (
        <Link to={`/myprojects/documents/${doc.id}`}>
          <DocumentItem title={doc.title} />
        </Link>
      ))}
    </div>
  );
}
