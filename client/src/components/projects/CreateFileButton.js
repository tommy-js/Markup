import React from "react";
import { addDocumentMutation } from "../../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";

export function CreateFileButton(props) {
  return (
    <div className="add_file_button_clickable">
      <button onClick={props.addFile} className="add_file_inner_button">
        Add New File
      </button>
    </div>
  );
}
