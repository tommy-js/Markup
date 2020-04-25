import React from "react";

interface Props {
  name: string;
}

export const Member: React.FC<Props> = props => {
  return (
    <div className="person">
      <span>{props.name}</span>
    </div>
  );
};
