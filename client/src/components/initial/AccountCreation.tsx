import React, { useState, useContext, useEffect } from "react";
import "../../App.scss";
import SignIn from "./SignIn";
import SignUp from "./SignUp.js";

import { userContext } from "../../App";
import { useHistory, Link, Route } from "react-router-dom";
import { loggedInContext } from "../../App";
import Cookies from "universal-cookie";
import { userQuery } from "../../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
const aes256 = require("aes256");

const AccountCreation: React.FC = () => {
  const { userVal, setUserVal } = useContext(userContext);
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);
  const history = useHistory();
  const [passInUser, { data, loading }] = useLazyQuery(userQuery);
  const cookies = new Cookies();

  useEffect(() => {
    if (!loggedIn) {
      if (cookies.get("SESS_ID") && cookies.get("SESS_KEY")) {
        let sessionid = cookies.get("SESS_ID");
        let key = cookies.get("SESS_KEY").toString();
        let dec = aes256.decrypt(key, sessionid);
        passInUser({
          variables: {
            username: dec
          }
        });
        setLoggedIn(true);
        let path = "/home";
        history.push(path);
      } else {
        let path = "/";
        history.push(path);
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      setUserVal({ username: data.user.username, id: data.user.id });
    }
  }, [data]);

  return (
    <div className="account_creation_block">
      <div className="account_creation">
        <SignUp />
        <SignIn />
      </div>
    </div>
  );
};

export default compose(graphql(userQuery, { name: "userQuery" }))(
  AccountCreation
);
