import React from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  id: number;
  content: string;
}

export const AdminProjectListing: React.FC<Props> = props => {
  return (
    <div>
      <Link to={`/profile/contributor/${props.id}`}>
        <div className="open_project">
          <h2>{props.title}</h2>
          <p>{props.content}</p>
        </div>
      </Link>
    </div>
  );
};
