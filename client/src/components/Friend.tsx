import React from "react";
import { Link } from "react-router-dom";
import "../App.scss";

interface Props {
  name: string;
  id: number;
}

export const Friend: React.FC<Props> = props => {
  return (
    <div className="person">
      <Link to={`/home/${props.id}`}>
        <span>
          {props.name} #{props.id}
        </span>
      </Link>
    </div>
  );
};
