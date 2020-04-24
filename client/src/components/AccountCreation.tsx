import React, { useState } from "react";
import "../App.scss";
import SignIn from "./SignIn";
import SignUp from "./SignUp.js";

export const AccountCreation: React.FC = () => {
  return (
    <div>
      <SignUp />
      <SignIn />
    </div>
  );
};
