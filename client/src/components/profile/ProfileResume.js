import React, { useContext } from "react";
import { userContext } from "../../App";

export function ProfileResume() {
  const { userVal, setUserVal } = useContext(userContext);

  return (
    <div>
      <h1>{userVal.username}</h1>
    </div>
  );
}
