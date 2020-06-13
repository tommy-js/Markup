import React, { useState, useEffect } from "react";

export function CodeModal(props) {
  function updateCode(e) {
    props.updateCode(e.target.value);
  }

  return (
    <div className="code_modal">
      <div className="code_modal_inner_block">
        <textarea
          className="code_modal_textarea"
          value={props.innerCode}
          onChange={e => updateCode(e)}
        />
        <button onClick={() => props.deleteCode()}>Delete</button>
        <button>Save</button>
      </div>
    </div>
  );
}
