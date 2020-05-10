import React, { useEffect, useContext, useState } from "react";
import { Navbar } from "../navigation/Navbar";
import { userContext } from "../../App";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { userQuery } from "../../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { loggedInContext } from "../../App";
const aes256 = require("aes256");

const About: React.FC = () => {
  const history = useHistory();
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);
  const [passInUser, { data, loading }] = useLazyQuery(userQuery);
  const cookies = new Cookies();

  useEffect(() => {
    if (!loggedIn) {
      if (cookies.get("SESS_ID") && cookies.get("SESS_KEY")) {
        let sessionid = cookies.get("SESS_ID");
        let key = cookies.get("SESS_KEY").toString();
        let dec = aes256.decrypt(key, sessionid);
        console.log(dec);
        passInUser({
          variables: {
            username: dec
          }
        });
        setLoggedIn(true);
      } else {
        let path = "/";
        history.push(path);
      }
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="under_header">
        <h1 className="about_header">About Us</h1>
        <p className="about_body">
          Saturnia is a webapp designed to make getting into software
          development easier. We provide you with a number of projects to work
          on and give you a more objective view of your progress and abilities.
        </p>
      </div>
    </div>
  );
};

export default compose(graphql(userQuery, { name: "userQuery" }))(About);
