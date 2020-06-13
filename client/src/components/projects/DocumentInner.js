import React from "react";
import { TextEditor } from "./TextEditor";

export function DocumentInner(props) {
  return (
    <div className="document_inner">
      <TextEditor content={props.content} />
    </div>
  );
}
