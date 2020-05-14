import React, { useState } from "react";

export const UserSettings: React.FC = () => {
  const [saveData, setSaveData] = useState(false);

  return (
    <div className="profile_settings_block">
      <h2 className="profile_settings_header">Settings</h2>
      <div className="profile_setting_option">
        <form>
          <input
            className="setting_checkbox"
            type="checkbox"
            checked={saveData}
            onChange={() => setSaveData(!saveData)}
          />
          <label className="setting_spec">Save User Info</label>
          <button>Save Settings</button>
        </form>
      </div>
    </div>
  );
};
