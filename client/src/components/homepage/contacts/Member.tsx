import React, { useState } from "react";
import RemoveTeammateButton from "./RemoveTeammateButton";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

interface Props {
  name: string;
  id: number;
  userId: number;
}

export const Member: React.FC<Props> = props => {
  const [removeTeammate, setRemoveTeammate] = useState(false);

  function contextMenu() {
    return (
      <ContextMenu id="teammate_context_menu">
        <MenuItem onClick={() => setRemoveTeammate(true)}>
          Remove Teammate
        </MenuItem>
      </ContextMenu>
    );
  }

  return (
    <div className="person_container">
      <ContextMenuTrigger id="teammate_context_menu">
        <div className="person">
          <span>{props.name}</span>
          <RemoveTeammateButton
            id={props.id}
            removeTeammate={removeTeammate}
            userId={props.userId}
          />
        </div>
      </ContextMenuTrigger>
      {contextMenu()}
    </div>
  );
};
