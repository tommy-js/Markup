import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { DocumentInner } from "./DocumentInner";

export function CenterContainer(props) {
  const [projects, setProjects] = useState();

  useEffect(() => {
    if (props.updatedProj) {
      setProjects(props.updatedProj.documents);
    }
  }, [props.updatedProj]);

  if (props.documents) {
    return (
      <div>
        <div>
          {props.documents.map(el => (
            <Route path={`/myprojects/documents/${el.id}`}>
              <DocumentInner
                key={el.id}
                id={el.id}
                updates={el.update}
                name={el.name}
              />
            </Route>
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
