import React, { useState } from "react";

interface Props {
  setSearch: (submittedStack: object) => void;
}

export const SideSearchBar: React.FC<Props> = props => {
  const [searchSettings, setSearchSettings] = useState({
    stack: ""
  });

  function passSearchParams(e: any) {
    e.preventDefault();
    props.setSearch(searchSettings);
  }

  return (
    <div className="side_search_bar">
      <p>Search Settings</p>
      <form onSubmit={e => passSearchParams(e)}>
        <input
          type="text"
          value={searchSettings.stack}
          onChange={e =>
            setSearchSettings({
              stack: e.target.value
            })
          }
          placeholder="Stack"
        />
        <button>Search</button>
      </form>
    </div>
  );
};
