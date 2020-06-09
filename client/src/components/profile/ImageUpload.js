import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

export function ImageUpload() {
  const [files, setFiles] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    multiple: false,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs = files.map(file => (
    <div className="thumb" key={file.name}>
      <div className="thumbInner">
        <img src={file.preview} className="img_block" />
      </div>
    </div>
  ));

  return (
    <div className="dropzone_container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drop your profile image here</p>
      </div>
      <span>
        <h4>Files</h4>
        <aside className="thumbsContainer">{thumbs}</aside>
      </span>
    </div>
  );
}
