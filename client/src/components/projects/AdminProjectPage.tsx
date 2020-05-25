import React, { useEffect, useContext } from "react";
import { Navbar } from "../navigation/Navbar";
import { loggedInContext } from "../../App";
import { userContext } from "../../App";
import Cookies from "universal-cookie";
import { userQuery } from "../../queries/queries";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/react-hooks";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
const aes256 = require("aes256");

interface Props {
  id: number;
  title: string;
  content: string;
}

const AdminProjectPage: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);
  const cookies = new Cookies();
  const history = useHistory();
  const [passInUser, { data, loading }] = useLazyQuery(userQuery);

  useEffect(() => {
    if (!loggedIn) {
      if (cookies.get("SESS_ID") && cookies.get("SESS_KEY")) {
        console.log("should push");
        let sessionid = cookies.get("SESS_ID");
        let key = cookies.get("SESS_KEY").toString();
        let dec = aes256.decrypt(key, sessionid);
        let loweredDec = dec.toLowerCase();
        passInUser({
          variables: {
            username: loweredDec,
            id: key
          }
        });
        setLoggedIn(true);
      } else {
        let path = "/";
        history.push(path);
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      console.log("data");
      setUserVal({
        username: data.user.username,
        id: data.user.id,
        projects: data.user.projects
      });
    }
  }, [data]);

  return (
    <div className="profile_block">
      <div className="profile_project_listings">
        <Navbar />
        <div>
          <p>{props.title}</p>
          <p>{props.content}</p>
          <p>You're contributing to this project</p>
        </div>
      </div>
    </div>
  );
};

export default compose(graphql(userQuery, { name: "userQuery" }))(
  AdminProjectPage
);
