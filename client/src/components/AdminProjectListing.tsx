import React from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  id: number;
}

export const AdminProjectListing: React.FC<Props> = props => {
  return (
    <div>
      <Link to={`/${props.id}`}>
        <div className="open_project">
          <h2>{props.title}</h2>
          <p>"Description"</p>
        </div>
      </Link>
    </div>
  );
};
