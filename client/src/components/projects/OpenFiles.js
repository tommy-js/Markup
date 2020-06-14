import React, { useState } from "react";
import { DocumentItem } from "./DocumentItem";
import { Link } from "react-router-dom";
import { MenuItem, ContextMenu, ContextMenuTrigger } from "react-contextmenu";

export function OpenFiles(props) {
  const [randomInt] = useState(Math.floor(Math.random() * 1000000));
  const [testingData] = useState([
    { title: "test1", id: 242 },
    { title: "test2", id: 3557 }
  ]);

  function contextMenu() {
    return (
      <div>
        <ContextMenu id={`file_context_menu_${randomInt}`}>
          <MenuItem>Open Document</MenuItem>
          <MenuItem>Add Users</MenuItem>
          <MenuItem>Delete</MenuItem>
        </ContextMenu>
      </div>
    );
  }

  return (
    <div className="open_files_container">
      <div className="selected_project_header">
        <span>{props.selectedProject}</span>
      </div>
      {testingData.map(doc => (
        <ContextMenuTrigger id={`file_context_menu_${randomInt}`}>
          <Link to={`/myprojects/documents/${doc.id}`}>
            <DocumentItem title={doc.title} />
          </Link>
        </ContextMenuTrigger>
      ))}
      {contextMenu()}
    </div>
  );
}
