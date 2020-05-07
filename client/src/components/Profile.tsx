import React from "react";
import { Navbar } from "./Navbar";

export const Profile: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="under_header">
        <h1>Profile</h1>
      </div>
    </div>
  );
};
