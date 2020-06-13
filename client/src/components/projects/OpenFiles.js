import React, { useState } from "react";
import { DocumentItem } from "./DocumentItem";

export function OpenFiles() {
  const [testingData] = useState([{ title: "test1" }, { title: "test2" }]);

  return (
    <div className="open_files_container">
      {testingData.map(doc => (
        <DocumentItem title={doc.title} />
      ))}
    </div>
  );
}
