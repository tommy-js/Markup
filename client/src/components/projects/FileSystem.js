import React from "react";
import CreateFileButton from "./CreateFileButton";

export function FileSystem() {
  return (
    <div>
      <p>Files</p>
      <div className="add_new_file_button">
        <CreateFileButton />
      </div>
    </div>
  );
}
