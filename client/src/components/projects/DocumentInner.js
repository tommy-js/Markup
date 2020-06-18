import React, { useState, useEffect } from "react";
import TextEditor from "./TextEditor";

export function DocumentInner(props) {
  const [visualUpdates, setVisualUpdates] = useState([]);
  const [viewableContent, setViewableContent] = useState("");

  useEffect(() => {
    if (props.updates) {
      let arr = [];
      let passInto;
      props.updates.map(
        el => (
          (passInto = `${el.userId} at ${el.timestamp}`), arr.push(passInto)
        )
      );
      setVisualUpdates(arr);
      let updaterArr = props.updates;
      let len = updaterArr.length;
      let current = updaterArr[len - 1].content;
      setViewableContent(current);
    }
  }, [props.updates]);

  if (props.updates) {
    return (
      <div className="document_inner">
        {props.name}
        <TextEditor
          id={props.id}
          visualUpdates={visualUpdates}
          viewableContent={viewableContent}
        />
      </div>
    );
  }
}
