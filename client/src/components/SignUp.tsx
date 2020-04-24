import React, { useState } from "react";
import "../App.scss";
import { Link } from "react-router-dom";
import { addUserMutation } from "../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";

interface Props {
  addUserMutation: (variables: object) => void;
}

const SignUp: React.FC<Props> = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function newUser(e: any) {
    e.preventDefault();
    props.addUserMutation({
      variables: {
        id: Math.floor(Math.random() * 1000000000),
        username: username,
        password: password
      }
    });
  }
  return (
    <div>
      <form className="userform">
        <label className="signup_field">Sign up</label>
        <input
          className="user_input_fields"
          type="text"
          placeholder="username"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="user_input_fields"
          type="text"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <Link to="/home">
          <button>Bypass</button>
        </Link>
        <button onClick={e => newUser(e)}>Create Account</button>
      </form>
    </div>
  );
};

export default compose(graphql(addUserMutation, { name: "addUserMutation" }))(
  SignUp
);
