import React, { useState, useEffect, useContext } from "react";
import "../App.scss";
import { Link } from "react-router-dom";
import { userQuery } from "../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { userContext } from "../App";

interface Props {
  userQuery: (variables: string) => object;
}

const SignIn: React.FC<Props> = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passUser, { loading, data }] = useLazyQuery(userQuery);
  const [user, setUser] = useState(null);
  const [bordering, setBordering] = useState("1px solid black");
  const { userVal, setUserVal } = useContext(userContext);

  if (data && data.username) {
    setUser(data);
  }

  useEffect(() => {
    if (data) {
      let { user } = data;
      if (user.password == password) {
        setBordering("1px solid blue");
        setUserVal(user.username);
      } else {
        setBordering("1px solid red");
      }
    }
  }, [data]);

  function getUser() {
    passUser({ variables: { username: username } });
  }

  console.log(data);

  return (
    <div>
      <div className="userform">
        <label className="signup_field">Log in</label>
        <input
          className="user_input_fields"
          style={{ border: bordering }}
          type="text"
          placeholder="username"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="user_input_fields"
          style={{ border: bordering }}
          type="text"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <Link to="/home">
          <button>Bypass</button>
        </Link>
        <button onClick={() => getUser()}>Sign in</button>
      </div>
    </div>
  );
};

export default compose(graphql(userQuery, { name: "userQuery" }))(SignIn);
