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

const Contact: React.FC = () => {
  function sendContactInfo() {
    // This function sends to administrator dashboard
  }

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
        <h1 className="contact_header">Contact Us!</h1>
        <div className="contact_list">
          <p>
            Have a bug to report? Want to know about our future developments?
            Just want to get in touch? Leave your information below and we'll
            get back to you promptly!
          </p>
          <form onSubmit={() => sendContactInfo()}>
            <div className="inline_contact_info">
              <label className="contact_label">Email:</label>
              <input
                className="contact_input"
                type="text"
                placeholder="example@email.com"
              />
            </div>
            <textarea className="contact_textarea" placeholder="message" />
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default compose(graphql(userQuery, { name: "userQuery" }))(Contact);
