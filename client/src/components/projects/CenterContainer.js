import React, { useState } from "react";
import { Route } from "react-router-dom";
import { DocumentInner } from "./DocumentInner";

export function CenterContainer() {
  const [test] = useState([
    { id: 242, content: "Inner content" },
    { id: 3557, content: "Also inner content" }
  ]);

  return (
    <div>
      <div>
        {test.map(el => (
          <Route path={`/myprojects/documents/${el.id}`}>
            <DocumentInner id={el.id} content={el.content} />
          </Route>
        ))}
      </div>
    </div>
  );
}
