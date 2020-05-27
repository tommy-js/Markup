import React, { useState, useContext, useEffect } from "react";
import "../../App.scss";
import { useHistory } from "react-router-dom";
import { addUserMutation, addSessionIDMutation } from "../../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { userContext } from "../../App";
import { loggedInContext } from "../../App";
import { useCookies } from "react-cookie";
import closed_eye from "../../icons/closed_eye_mod.png";
import open_eye from "../../icons/open_eye_mod.png";
const bcrypt = require("bcryptjs");
const aes256 = require("aes256");

function SignUp(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [shownPassword, setShownPassword] = useState("");
  const { userVal, setUserVal } = useContext(userContext);
  const [validPassword, setValidPassword] = useState(false);
  const [showToggle, setShowToggle] = useState(true);
  const [validUsername, setValidUsername] = useState(true);
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);
  const history = useHistory();
  const [cookies, setCookie] = useCookies(["SESS_ID", "SESS_KEY"]);
  const [passwordVisible, setPasswordVisible] = useState(closed_eye);

  useEffect(() => {
    if (showToggle === false) {
      setPasswordVisible(open_eye);
    } else {
      setPasswordVisible(closed_eye);
    }
  }, [showToggle]);

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
        id: id,
        projects: []
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
      setLoggedIn(true);
      logIn();
    }
  }

  function logIn() {
    let path = "/home";
    history.push(path);
  }

  return (
    <div>
      <div className="userform">
        <div className="username_component">
          <label className="signup_field">Sign up</label>
          <input
            className="username_input_fields"
            type="text"
            placeholder="username"
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="password_component">
          <input
            className="password_input_fields"
            type={showToggle ? "password" : "text"}
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
          />
          <div className="password_hide_comp">
            <img
              className="password_hide_button"
              src={passwordVisible}
              onClick={() => setShowToggle(!showToggle)}
            />
          </div>
          <p className="password_criteria">
            *At least 8 characters including two or more non-letter characters.
          </p>
        </div>
        <button className="sign_in_button" onClick={e => newUser(e)}>
          Create Account
        </button>
      </div>
    </div>
  );
}

export default compose(
  graphql(addUserMutation, { name: "addUserMutation" }),
  graphql(addSessionIDMutation, { name: "addSessionIDMutation" })
)(SignUp);
