import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";

interface Props {
  title: string;
  id: number;
  content: string;
}

export const AdminProjectListing: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);

  useEffect(() => {
    console.log(userVal);
  }, []);
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
