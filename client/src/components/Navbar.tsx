import React from "react";
import { Link } from "react-router-dom";
import "../App.scss";

export const Navbar: React.FC = props => {
  return (
    <div className="navbar">
      <Link className="nav_item" to="/home">
        Home
      </Link>
      <Link className="nav_item" to="/profile">
        Profile
      </Link>
      <Link className="nav_item" to="/about">
        About
      </Link>
      <Link className="nav_item" to="/contact">
        Contact
      </Link>
      <Link className="nav_item" to="/projects">
        Projects
      </Link>
    </div>
  );
};
