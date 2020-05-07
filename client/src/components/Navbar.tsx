import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import favicon from "../icons/favicon-32x32.png";
import "../App.scss";

export const Navbar: React.FC = props => {
  const history = useHistory();

  function logOut() {
    let path = "/";
    history.push(path);
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
        to="/profile"
      >
        <div className="middle_align">Profile</div>
      </NavLink>
      <NavLink
        className="nav_item"
        activeClassName="nav_item_active"
        to="/projects"
      >
        Projects
      </NavLink>
      <NavLink
        className="nav_item"
        activeClassName="nav_item_active"
        to="/about"
      >
        About
      </NavLink>
      <NavLink
        className="nav_item"
        activeClassName="nav_item_active"
        to="/contact"
      >
        Contact
      </NavLink>
      <div onClick={() => logOut()} className="nav_item">
        Log Out
      </div>
    </div>
  );
};
