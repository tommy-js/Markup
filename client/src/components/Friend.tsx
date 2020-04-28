import React from "react";
import "../App.scss";

interface Props {
  name: string;
  id: number;
}

export const Friend: React.FC<Props> = props => {
  return (
    <div className="person">
      <span>
        {props.name} #{props.id}
      </span>
    </div>
  );
};
