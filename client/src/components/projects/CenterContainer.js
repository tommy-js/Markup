import React, { useState } from "react";
import { Route } from "react-router-dom";
import { DocumentInner } from "./DocumentInner";

export function CenterContainer() {
  const [test] = useState([{ id: 242 }, { id: 3557 }]);

  return (
    <div>
      <div>
        {test.map(el => (
          <Route path={`/myprojects/docs/${el.id}`}>
            <DocumentInner id={el.id} />
          </Route>
        ))}
      </div>
    </div>
  );
}
