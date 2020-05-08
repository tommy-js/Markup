import React, { useEffect, useContext } from "react";
import { userContext } from "../../App";
import { useHistory } from "react-router-dom";

export const Redirect: React.FC = () => {
  const { userVal, setUserVal } = useContext(userContext);
  const history = useHistory();

  useEffect(() => {
    if (!userVal.username) {
      let path = "/";
      history.push(path);
    }
  });
  return null;
};
