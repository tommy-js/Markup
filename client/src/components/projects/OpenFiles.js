import React, { useState, useEffect } from "react";
import { DocumentItem } from "./DocumentItem";
import { Link } from "react-router-dom";
import { MenuItem, ContextMenu, ContextMenuTrigger } from "react-contextmenu";

export function OpenFiles(props) {
  const [randomInt] = useState(Math.floor(Math.random() * 1000000));
  const [projects, setProjects] = useState();

  useEffect(() => {
    if (props.newProj) {
      console.log(props.newProj.id);
      getDocs({
        variables: {
          projectId: props.newProj.id
        }
      });
    }
  }, [props.newProj]);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  function contextMenu() {
    return (
      <div>
        <ContextMenu id={`file_context_menu_${randomInt}`}>
          <MenuItem>Open Document</MenuItem>
          <MenuItem>Add Users</MenuItem>
          <MenuItem>Rename</MenuItem>
          <MenuItem>Delete</MenuItem>
        </ContextMenu>
      </div>
    );
  }

  if (projects) {
    return (
      <div className="open_files_container">
        <div className="selected_project_header">
          <span>{props.selectedProject}</span>
        </div>
        {projects.map(doc => (
          <ContextMenuTrigger id={`file_context_menu_${randomInt}`}>
            <Link to={`/myprojects/documents/${doc.id}`}>
              <DocumentItem key={doc.id} title={doc.name} />
            </Link>
          </ContextMenuTrigger>
        ))}
        {contextMenu()}
      </div>
    );
  } else {
    return null;
  }
}
