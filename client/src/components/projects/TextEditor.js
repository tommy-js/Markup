import React, { useState, useContext } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { updateDocument } from "../../queries/queries";
import { userContext } from "../../App";

function TextEditor(props) {
  const [innerVal, setInnerVal] = useState("props.content");
  const [fontSize, setFontSize] = useState();
  const [modFontSize, setModFontSize] = useState(16);
  const { userVal, setUserVal } = useContext(userContext);

  function changeInnerVal(val) {
    setInnerVal(val);
  }

  function changeFontSize(size) {
    setFontSize(size);
  }

  function saveChanges() {
    let time = Math.round(new Date().getTime() / 1000);
    props.updateDocument({
      variables: {
        id: props.id,
        content: innerVal,
        userId: userVal.id,
        timestamp: time
      }
    });
  }

  return (
    <div className="text_editor">
      <div className="text_editor_container">
        <input onChange={e => setModFontSize(e.target.value)} />
        <button onClick={() => changeFontSize(modFontSize)}>Set</button>
        <textarea
          className="inner_text_editor"
          onChange={e => changeInnerVal(e.target.value)}
          value={innerVal}
          style={{ fontSize: fontSize + "px" }}
        />
        <button onClick={() => saveChanges()}>Save</button>
      </div>
    </div>
  );
}

export default compose(graphql(updateDocument, { name: "updateDocument" }))(
  TextEditor
);
