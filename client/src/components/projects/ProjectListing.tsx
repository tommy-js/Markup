import React from "react";
import { Link } from "react-router-dom";
import "../../App.scss";

interface Props {
  title: string;
  id: number;
  description: string;
}

export const ProjectListing: React.FC<Props> = props => {
  return (
    <div>
      <div className="open_project">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </div>
  );
};
