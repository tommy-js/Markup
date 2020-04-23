import React from "react";
import { Member } from "./Member";

export const TeamTab: React.FC = () => {
  const team = ["Teammember1", "Teammember2", "Teammember3"];

  return (
    <div>
      {team.map(members => (
        <Member name={members} />
      ))}
    </div>
  );
};
