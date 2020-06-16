import React, { useState } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { updateDocument } from "../../queries/queries";

function TextEditor(props) {
  const [innerVal, setInnerVal] = useState(props.content);

  function changeInnerVal(val) {
    setInnerVal(val);
  }

  function saveChanges() {
    props.updateDocument({
      variables: {
        id: props.id,
        content: innerVal
      }
    });
  }

  return (
    <div className="text_editor">
      <textarea
        onChange={e => changeInnerVal(e.target.value)}
        value={innerVal}
      />
      <button onClick={() => saveChanges()}>Save</button>
    </div>
  );
}

export default compose(graphql(updateDocument, { name: "updateDocument" }))(
  TextEditor
);
