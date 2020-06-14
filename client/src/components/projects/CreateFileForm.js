import React, { useState } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { addDocumentMutation } from "../../queries/queries";

function CreateFileForm(props) {
  const [documentName, setDocumentName] = useState("");

  function changeName(val) {
    setDocumentName(val);
  }

  function submitFile(e) {
    e.preventDefault();
    props.addDocumentMutation({
      variables: {
        id: Math.floor(Math.random() * 100000),
        projectId: props.selectedProjectId,
        name: documentName
      }
    });
  }

  return (
    <div>
      <form onSubmit={e => submitFile(e)}>
        <input
          type="text"
          placeholder="Name"
          onChange={e => changeName(e.target.value)}
          value={documentName}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default compose(
  graphql(addDocumentMutation, { name: "addDocumentMutation" })
)(CreateFileForm);
