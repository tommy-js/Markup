import React, { useEffect, useContext, useState } from "react";
import { Navbar } from "../navigation/Navbar";
import { userContext } from "../../App";
import { useHistory } from "react-router-dom";

export const About: React.FC = () => {
  const history = useHistory();
  const { userVal, setUserVal } = useContext(userContext);

  useEffect(() => {
    if (!userVal.username) {
      let path = "/";
      history.push(path);
    }
  });

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
