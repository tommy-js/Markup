import React from "react";
import { Link } from "react-router-dom";
import "../App.scss";

interface Props {
  name: string;
  id: number;
}

export const Friend: React.FC<Props> = props => {
  return (
    <div className="person_container">
      <Link className="link_to_person" to={`/home/${props.id}`}>
        <div className="person">
          <span>
            {props.name} #{props.id}
          </span>
        </div>
      </Link>
    </div>
  );
};
