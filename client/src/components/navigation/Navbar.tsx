import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import favicon from "../../icons/favicon-32x32.png";
import "../../App.scss";
import { loggedInContext } from "../../App";
import { userContext } from "../../App";
import Cookies from "universal-cookie";

export const Navbar: React.FC = () => {
  const { userVal, setUserVal } = useContext(userContext);
  const history = useHistory();
  const cookies = new Cookies();
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);

  function logOut() {
    setUserVal();
    setLoggedIn(false);
    let path = "/";
    history.push(path);
    cookies.remove("SESS_ID");
    cookies.remove("SESS_KEY");
  }

  return (
    <div className="navbar">
      <NavLink
        className="nav_item"
        activeClassName="nav_item_active"
        to="/home"
      >
        <div className="header_image_block">
          <img className="header_image" src={favicon} />
        </div>
      </NavLink>
      <NavLink
        className="nav_item"
        activeClassName="nav_item_active"
        to={`/profile/projects/${userVal.id}`}
      >
        <div className="middle_align">Profile</div>
      </NavLink>
      <NavLink
        className="nav_item"
        activeClassName="nav_item_active"
        to="/projects"
      >
        <div className="middle_align">Projects</div>
      </NavLink>
      <NavLink
        className="nav_item"
        activeClassName="nav_item_active"
        to="/about"
      >
        <div className="middle_align">About</div>
      </NavLink>
      <div onClick={() => logOut()} className="nav_item">
        <div className="middle_align">Log Out</div>
      </div>
    </div>
  );
};
