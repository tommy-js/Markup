import React from "react";
import { Navbar } from "./Navbar";

export const About: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="under_header">
        <h1 className="about_header">About Us</h1>
        <p className="about_body">
          Saturnia is a webapp designed to make getting into software
          development easier. We provide you with a number of projects to work
          on and give you a more objective view of your progress and abilities.
        </p>
      </div>
    </div>
  );
};
