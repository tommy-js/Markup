import React, { useState, useContext } from "react";
import "../App.scss";
import { useHistory } from "react-router-dom";
import { addUserMutation } from "../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { userContext } from "../App";

function SignUp(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userVal, setUserVal } = useContext(userContext);
  const history = useHistory();

  function newUser(e) {
    e.preventDefault();
    let id = Math.floor(Math.random() * 1000000000);
    props.addUserMutation({
      variables: {
        id: id,
        username: username,
        password: password
      }
    });
    setUserVal({ username: username, password: password, id: id });
    logIn();
  }

  function logIn() {
    let path = "/home";
    history.push(path);
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
        <button className="sign_in_button" onClick={e => newUser(e)}>
          Create Account
        </button>
      </form>
    </div>
  );
}

export default compose(graphql(addUserMutation, { name: "addUserMutation" }))(
  SignUp
);
