import React, { useContext, useState, useEffect } from "react";
import { FriendList } from "./contacts/FriendList";
import { MessageViewer } from "./messaging/MessageViewer";
import { TaskList } from "./tasks/TaskList";
import { Navbar } from "../navigation/Navbar";
import { userContext } from "../../App";
import { loggedInContext } from "../../App";
import { useHistory } from "react-router-dom";
import { userQuery } from "../../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import Cookies from "universal-cookie";
import "../../App.scss";
const aes256 = require("aes256");

const HomePage: React.FC = () => {
  const [friends, setFriends] = useState([]);
  const { userVal, setUserVal } = useContext(userContext);
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);
  const [searching, setSearching] = useState(false);
  const history = useHistory();
  const [decrypt, setDecrypt] = useState();
  const [passInUser, { data, loading }] = useLazyQuery(userQuery);
  const cookies = new Cookies();

  const [projectMapper, setProjectMapper] = useState([]);
  const [userProjects, setUserProjectMapper] = useState([]);

  useEffect(() => {
    if (!loggedIn) {
      if (cookies.get("SESS_ID") && cookies.get("SESS_KEY")) {
        let sessionid = cookies.get("SESS_ID");
        let key = cookies.get("SESS_KEY").toString();
        let dec = aes256.decrypt(key, sessionid);
        console.log(dec);
        passInUser({
          variables: {
            username: dec
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
      setUserVal({ username: data.user.username, id: data.user.id });
    }
  }, [data]);

  function passFriends(friends: any) {
    setFriends(friends);
  }

  function searchingForFriends() {
    setSearching(true);
  }

  function viewMessages() {
    setSearching(false);
  }

  if (friends) {
    return (
      <div className="home_page">
        <Navbar />
        <div className="fixed_under">
          <FriendList
            searchingForFriends={searchingForFriends}
            passFriends={passFriends}
          />
          <MessageViewer
            friends={friends}
            searching={searching}
            viewMessages={viewMessages}
          />
          <TaskList />
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default compose(graphql(userQuery, { name: "userQuery" }))(HomePage);
