import React, { useState, useEffect, useContext } from "react";
import "../../App.scss";
import { useHistory } from "react-router-dom";
import { userQuery } from "../../queries/queries";
import { getUsers } from "../../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { userContext } from "../../App";
import { loggedInContext } from "../../App";
import { useCookies } from "react-cookie";
import closed_eye from "../../icons/closed_eye_mod.png";
import open_eye from "../../icons/open_eye_mod.png";
const bcrypt = require("bcryptjs");
const aes256 = require("aes256");

interface Props {
  getUsers: (variables: string) => object;
}

const SignIn: React.FC<Props> = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToggle, setShowToggle] = useState(true);
  const [getUsersmod, { loading, data }] = useLazyQuery(getUsers);
  const [user, setUser] = useState(null);
  const { userVal, setUserVal } = useContext(userContext);
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);
  const history = useHistory();
  const [cookies, setCookie] = useCookies(["SESS_ID", "SESS_KEY"]);
  const [passwordVisible, setPasswordVisible] = useState(closed_eye);
  const [hash, setHash] = useState();
  const [runLogIn, setRunLogIn] = useState(false);

  if (data && data.username) {
    setUser(data);
  }

  useEffect(() => {
    console.log(userVal);
  }, []);

  useEffect(() => {
    if (showToggle === false) {
      setPasswordVisible(open_eye);
    } else {
      setPasswordVisible(closed_eye);
    }
  }, [showToggle]);

  useEffect(() => {
    if (data) {
      // let foundInfo = data.getUsers.find((el: any) => hash === el.username);
      let newId;
      let loggedIn = false;
      let { getUsers } = data;
      for (let k = 0; k < getUsers.length; k++) {
        let checker = getUsers[k].username;
        let comparison = bcrypt.compareSync(password, getUsers[k].password);
        if (comparison === true) {
          console.log("Logging incorrectly");
          console.log(getUsers[k]);
          let currentUser = getUsers[k];
          let lowerCaseUsername = getUsers[k].username.toLowerCase();
          setUserVal({
            username: lowerCaseUsername,
            password: currentUser.password,
            id: currentUser.id,
            friends: currentUser.friends,
            projects: currentUser.projects,
            tasks: currentUser.tasks,
            teammates: currentUser.teammates,
            conversations: currentUser.conversations,
            friendrequests: currentUser.friendrequests
          });
          newId = getUsers[k].id;
          let plain = lowerCaseUsername;
          let encrypted = aes256.encrypt(newId, plain);
          setCookie("SESS_ID", encrypted, { path: "/" });
          setCookie("SESS_KEY", newId, { path: "/" });
          loggedIn = true;
          setLoggedIn(true);
          logIn();
          break;
        } else {
          continue;
        }
      }
      if (!loggedIn) {
        alert("Not logged in");
      }
    }
  }, [data, runLogIn]);

  function logIn() {
    let path = "/home";
    history.push(path);
  }

  function getUser() {
    getUsersmod({
      variables: { username: username.toLowerCase() }
    });
    setRunLogIn(!runLogIn);
  }

  return (
    <div>
      <div className="userform">
        <div className="username_component">
          <label className="signup_field">Log in</label>
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
        </div>
        <button className="sign_in_button" onClick={() => getUser()}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default compose(graphql(getUsers, { name: "getUsers" }))(SignIn);
