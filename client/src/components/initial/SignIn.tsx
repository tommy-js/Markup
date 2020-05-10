import React, { useState, useEffect, useContext } from "react";
import "../../App.scss";
import { useHistory } from "react-router-dom";
import { userQuery } from "../../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { userContext } from "../../App";
import { loggedInContext } from "../../App";

interface Props {
  userQuery: (variables: string) => object;
}

const SignIn: React.FC<Props> = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passUser, { loading, data }] = useLazyQuery(userQuery);
  const [user, setUser] = useState(null);
  const { userVal, setUserVal } = useContext(userContext);
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);
  const history = useHistory();

  if (data && data.username) {
    setUser(data);
  }

  useEffect(() => {
    if (data) {
      let { user } = data;
      if (user.password == password) {
        // setBordering("1px solid blue");
        setUserVal({
          username: user.username,
          password: user.password,
          id: user.id
        });
        setLoggedIn(true);
        logIn();
      } else {
        // setBordering("1px solid red");
      }
    }
  }, [data]);

  function logIn() {
    let path = "/home";
    history.push(path);
  }

  function getUser() {
    passUser({ variables: { username: username } });
  }

  return (
    <div>
      <div className="userform">
        <label className="signup_field">Log in</label>
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
        <button className="sign_in_button" onClick={() => getUser()}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default compose(graphql(userQuery, { name: "userQuery" }))(SignIn);