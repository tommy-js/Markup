import React, { useState } from "react";
import "../../App.scss";
import SignIn from "./SignIn";
import SignUp from "./SignUp.js";

export const AccountCreation: React.FC = () => {
  return (
    <div className="account_creation_block">
      <div className="account_creation">
        <SignUp />
        <SignIn />
      </div>
    </div>
  );
};
