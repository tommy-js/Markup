import React, { useState } from "react";
import "../App.scss";
import { Link } from "react-router-dom";
import { userQuery } from "../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";

interface Props {
  userQuery: (variables: object) => object;
}

const SignIn: React.FC<Props> = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passUser, setPassUser] = useLazyQuery(userQuery);

  function signIn(e: any) {
    e.preventDefault();
    passUser({
      variables: {
        username: username
      }
    });
    console.log(passUser);
  }

  return (
    <div>
      <form className="userform">
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
        <Link to="/home">
          <button>Bypass</button>
        </Link>
        <button onClick={e => signIn(e)}>Sign in</button>
      </form>
    </div>
  );
};

export default compose(graphql(userQuery, { name: "userQuery" }))(SignIn);
