import React, { useContext } from "react";
import { userContext } from "../../App";
import { Link } from "react-router-dom";
import "../../App.scss";

export const SuccessfulProject: React.FC = () => {
  const { userVal, setUserVal } = useContext(userContext);
  return (
    <div className="successful_project_block">
      <h2 className="successful_project_thanks">Thanks for submitting!</h2>

      <div className="new_project_button">
        <Link to={`../profile/projects/${userVal.id}`}>
          <span className="hide_on_swipe">Back to profile</span>
          <div className="swipe_right">
            <span className="show_on_swipe">Back to profile</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
