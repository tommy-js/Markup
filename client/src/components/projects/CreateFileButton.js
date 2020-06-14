import React from "react";
import { addDocumentMutation } from "../../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";

function CreateFileButton() {
  return (
    <div className="add_file_button_clickable">
      <button className="add_file_inner_button">Add New File</button>
    </div>
  );
}

export default compose(
  graphql(addDocumentMutation, { name: "addDocumentMutation" })
)(CreateFileButton);
