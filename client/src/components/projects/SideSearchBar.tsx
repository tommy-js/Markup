import React, { useState } from "react";

interface Props {
  setSearch: (submittedStack: string) => void;
}

export const SideSearchBar: React.FC<Props> = props => {
  const [stackSearchSettings, setStackSearchSettings] = useState("");

  function passSearchParams(e: any) {
    e.preventDefault();
    props.setSearch(stackSearchSettings);
  }

  return (
    <div className="side_search_bar">
      <div className="side_search_bar_container">
        <p>Search Settings</p>
        <form onSubmit={e => passSearchParams(e)}>
          <input
            type="text"
            value={stackSearchSettings}
            onChange={e => setStackSearchSettings(e.target.value)}
            placeholder="Stack"
          />
          <button>Search</button>
        </form>
      </div>
    </div>
  );
};
