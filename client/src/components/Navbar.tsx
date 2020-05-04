import React from "react";
import { Link } from "react-router-dom";
import "../App.scss";

export const Navbar: React.FC = props => {
  return (
    <div className="navbar">
      <Link to="/home">Home</Link>
      <Link to="/About">About</Link>
      <Link to="/Projects">Projects</Link>
    </div>
  );
};
