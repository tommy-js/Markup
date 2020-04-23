import React from "react";
import "../App.scss";
import { Link } from "react-router-dom";

export const AccountCreation: React.FC = () => {
  return (
    <div>
      <form className="userform">
        <label className="signup_field">Sign up</label>
        <input
          className="user_input_fields"
          type="text"
          placeholder="username"
        />
        <input
          className="user_input_fields"
          type="text"
          placeholder="password"
        />
        <Link to="/home">
          <button>Bypass</button>
        </Link>
      </form>
    </div>
  );
};
