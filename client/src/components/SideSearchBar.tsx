import React, { useState } from "react";

interface Props {
  setStackSearch: (submittedStack: string) => void;
}

export const SideSearchBar: React.FC<Props> = props => {
  const [searchSettings, setSearchSettings] = useState({
    stack: "",
    tester: ""
  });

  // function submitStack(inputKey: string) {
  //   setStack(inputKey);
  // }
  //
  // function passSearchParams() {
  //   props.setSearch();
  // }

  console.log(searchSettings);

  return (
    <div className="side_search_bar">
      <p>Search Settings</p>
      <input
        type="text"
        value={searchSettings.stack}
        onChange={e =>
          setSearchSettings({
            stack: e.target.value,
            tester: searchSettings.tester
          })
        }
        placeholder="Stack"
      />
      <input
        type="text"
        value={searchSettings.tester}
        onChange={e =>
          setSearchSettings({
            stack: searchSettings.stack,
            tester: e.target.value
          })
        }
      />
    </div>
  );
};
