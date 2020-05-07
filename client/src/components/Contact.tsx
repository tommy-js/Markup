import React, { useEffect, useContext, useState } from "react";
import { Navbar } from "./Navbar";
import { userContext } from "../App";
import { useHistory } from "react-router-dom";

export const Contact: React.FC = () => {
  function sendContactInfo() {
    // This function sends to administrator dashboard
  }

  const history = useHistory();
  const { userVal, setUserVal } = useContext(userContext);

  useEffect(() => {
    if (!userVal.username) {
      let path = "/";
      history.push(path);
    }
  });

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
