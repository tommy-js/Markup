import React, { useState, useContext, useEffect } from "react";
import "../../App.scss";
import { useHistory } from "react-router-dom";
import { addUserMutation, addSessionIDMutation } from "../../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { userContext } from "../../App";
import { useCookies } from "react-cookie";
const aes256 = require("aes256");
const bcrypt = require("bcryptjs");

function SignUp(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userVal, setUserVal } = useContext(userContext);
  const [validPassword, setValidPassword] = useState(false);
  const [validUsername, setValidUsername] = useState(true);
  const history = useHistory();
  const [cookies, setCookie] = useCookies(["SESS_ID", "SESS_KEY"]);

  useEffect(() => {
    if (password.length >= 8 && password.includes(`&`)) {
      if (password.includes(`&`) || password.includes(`%`)) {
        setValidPassword(true);
      }
    }
  }, [username, password]);

  function newUser(e) {
    e.preventDefault();
    if (validPassword && validUsername) {
      let id = Math.floor(Math.random() * 1000000000);
      var salt = bcrypt.genSaltSync(10);
      let lowerCaseUsername = username.toLowerCase();
      var hash = bcrypt.hashSync(password, salt);
      props.addUserMutation({
        variables: {
          id: id,
          username: lowerCaseUsername,
          password: hash,
          salt: salt
        }
      });
      setUserVal({
        username: lowerCaseUsername,
        id: id
      });
      let strId = id.toString();
      let plain = username;
      let encrypted = aes256.encrypt(strId, plain);
      setCookie("SESS_ID", encrypted, { path: "/" });
      setCookie("SESS_KEY", strId, { path: "/" });
      props.addSessionIDMutation({
        variables: {
          session_id: encrypted
        }
      });
      logIn();
    }
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
          placeholder="password*"
          onChange={e => setPassword(e.target.value)}
        />
        <p className="password_criteria">
          *At least 8 characters including two or more non-letter characters.
        </p>
        <button className="sign_in_button" onClick={e => newUser(e)}>
          Create Account
        </button>
      </form>
    </div>
  );
}

export default compose(
  graphql(addUserMutation, { name: "addUserMutation" }),
  graphql(addSessionIDMutation, { name: "addSessionIDMutation" })
)(SignUp);
