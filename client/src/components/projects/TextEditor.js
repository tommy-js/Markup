import React from "react";

export function TextEditor(props) {
  return (
    <div className="text_editor">
      <p>{props.content}</p>
    </div>
  );
}
