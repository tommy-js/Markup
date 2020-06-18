import React, { useState, useEffect } from "react";
import TextEditor from "./TextEditor";

export function DocumentInner(props) {
  const [visualUpdates, setVisualUpdates] = useState();

  useEffect(() => {
    console.log(props.updates);
    // if (props.updates) {
    //   let arr = [];
    //   let passInto;
    //   props.updates.map(
    //     el => (
    //       (passInto = `${el.userId} at ${el.timestamp}`), arr.push(passInto)
    //     )
    //   );
    //   setVisualUpdates(arr);
    //   console.log("info");
    //   console.log(arr);
    // }
  }, [props.updates]);

  return (
    <div className="document_inner">
      {props.name}
      <TextEditor id={props.id} />
    </div>
  );
}
