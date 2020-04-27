import React from "react";
import "../App.scss";

interface Props {
  user: string;
  id: number;
}

export const AddUserComponent: React.FC<Props> = props => {
  return (
    <div className="add_user_component">
      <div>
        {props.user} #{props.id} <div className="add_user">+</div>
      </div>
    </div>
  );
};
