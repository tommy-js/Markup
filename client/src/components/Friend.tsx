import React from "react";
import "../App.scss";

interface Props {
  person: string;
}

export const Friend: React.FC<Props> = props => {
  return (
    <div className="person">
      <span>{props.person}</span>
    </div>
  );
};
