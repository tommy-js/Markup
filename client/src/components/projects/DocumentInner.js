import React from "react";
import TextEditor from "./TextEditor";

export function DocumentInner(props) {
  return (
    <div className="document_inner">
      {props.name}
      <TextEditor content={props.content} id={props.id} />
    </div>
  );
}
