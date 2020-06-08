import React from "react";
import icon from "../../../icons/emojis/money_mouth.png";

export function Icon() {
  return (
    <div className="context_menu_icon">
      <img className="context_menu_icon_image" src={icon} />
      <span>Emoji</span>
    </div>
  );
}
