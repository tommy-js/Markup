import React from "react";

interface Props {
  profileName: string;
}

export const ProfileAccessor: React.FC<Props> = props => {
  return (
    <div>
      <p>{props.profileName}</p>
    </div>
  );
};
