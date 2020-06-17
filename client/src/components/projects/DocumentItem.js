import React, { useState } from "react";
import { MenuItem, ContextMenu, ContextMenuTrigger } from "react-contextmenu";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { deleteDocumentMutation } from "../../queries/queries";

function DocumentItem(props) {
  const [randomInt] = useState(Math.floor(Math.random() * 1000000));

  function deleteDocument() {
    props.deleteDocumentMutation({
      variables: {
        id: props.id
      }
    });
    props.removeFromDocs(props.id);
  }

  function contextMenu() {
    return (
      <div>
        <ContextMenu id={`file_context_menu_${randomInt}`}>
          <MenuItem>Add Users</MenuItem>
          <MenuItem>Rename</MenuItem>
          <MenuItem onClick={() => deleteDocument()}>Delete</MenuItem>
        </ContextMenu>
      </div>
    );
  }

  return (
    <div className="document_item">
      <ContextMenuTrigger id={`file_context_menu_${randomInt}`}>
        <div className="document_title">{props.title}</div>
      </ContextMenuTrigger>
      {contextMenu()}
    </div>
  );
}

export default compose(
  graphql(deleteDocumentMutation, { name: "deleteDocumentMutation" })
)(DocumentItem);
