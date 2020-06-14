import React, { useState } from "react";

export function TextEditor(props) {
  const [innerVal, setInnerVal] = useState(props.content);

  function changeInnerVal(val) {
    setInnerVal(val);
  }

  function saveChanges() {}

  return (
    <div className="text_editor">
      <textarea
        onChange={e => changeInnerVal(e.target.value)}
        value={innerVal}
      />
      <button onClick={saveChanges()}>Save</button>
    </div>
  );
}
