import React from "react";

interface Props {
  message: string;
}

export const IndividualMessage: React.FC<Props> = props => {
  return (
    <div>
      <p>{props.message}</p>
    </div>
  );
};
