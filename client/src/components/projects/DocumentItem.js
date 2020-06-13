import React from "react";

export function DocumentItem(props) {
  return (
    <div className="document_item">
      <div className="document_title">{props.title}</div>
    </div>
  );
}
