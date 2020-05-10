import React from "react";
import RemoveTeammateButton from "./RemoveTeammateButton";

interface Props {
  name: string;
  id: number;
  userId: number;
}

export const Member: React.FC<Props> = props => {
  return (
    <div className="person_container">
      <div className="person">
        <span>{props.name}</span>
        <RemoveTeammateButton id={props.id} userId={props.userId} />
      </div>
    </div>
  );
};
