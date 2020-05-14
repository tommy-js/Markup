import React, { useState } from "react";
import Cookies from "universal-cookie";
import { userQuery } from "../../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { useHistory, Link, Route } from "react-router-dom";
const aes256 = require("aes256");

const UserSettings = () => {
  const [saveData, setSaveData] = useState(true);

  function submitForm() {
    if (saveData === false) {
    }
  }

  return (
    <div className="profile_settings_block">
      <h2 className="profile_settings_header">Settings</h2>
      <div className="profile_setting_option">
        <form onSubmit={() => submitForm()}>
          <input
            className="setting_checkbox"
            name="save_user_data"
            type="checkbox"
            checked={saveData}
            onChange={() => setSaveData(!saveData)}
          />
          <label htmlFor="save_user_data" className="setting_spec">
            Save User Login
          </label>
          <button className="save_settings_button">Save Settings</button>
        </form>
      </div>
    </div>
  );
};

export default UserSettings;
