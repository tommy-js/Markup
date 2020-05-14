import React from "react";
import "./profile.scss";

export const ProfileContact: React.FC = () => {
  return (
    <div className="profile_contact">
      <h1 className="contact_header">Contact us!</h1>
      <h3 className="contact_subheader">
        Tell us about bugs, suggestions you have for the app, and changes you
        would like to see in the future!
      </h3>
      <form className="contact_fillin_div">
        <textarea className="contact_fillin" />
        <button className="contact_submit_button">Submit</button>
      </form>
    </div>
  );
};
