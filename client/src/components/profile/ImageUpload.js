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
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <aside className="thumbsContainer">{thumbs}</aside>
      </aside>
    </section>
  );
}
