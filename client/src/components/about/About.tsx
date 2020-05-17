import React, { useEffect, useContext, useState } from "react";
import { Navbar } from "../navigation/Navbar";
import { userContext } from "../../App";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { userQuery } from "../../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { loggedInContext } from "../../App";
const aes256 = require("aes256");

const About: React.FC = () => {
  const history = useHistory();
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);
  const [passInUser, { data, loading }] = useLazyQuery(userQuery);
  const cookies = new Cookies();
  const [editableCodeInput, setEditableCodeInput] = useState(
    `if(val) { \n setVal(!val)\n}`
  );

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

  return (
    <div>
      <Navbar />
      <div className="under_header">
        <div className="about_sidebar">
          <div className="about_sidebar_buttons"></div>
        </div>
        <div className="about_text">
          <h1 className="about_header">About Saturnia</h1>
          <h2 className="about_subheader">
            A webapp by developers for developers
          </h2>
          <div className="about_example_code_block">
            <textarea
              className="about_example_code_textarea"
              placeholder="Code..."
              value={editableCodeInput}
              onChange={e => setEditableCodeInput(e.target.value)}
            />
            <div className="about_example_code_explanation">
              Code together in snippets within your messages. Solve bugs or work
              on features with ease, and blueprint effortlessly.
              <h4>Features include:</h4>
              <ul>
                <li>Code highlighting</li>
                <li>Code autocompletion</li>
                <li>Basic error finding</li>
              </ul>
            </div>
          </div>

          <div className="about_example_message_block"></div>

          <p className="about_body">
            Saturnia is a webapp designed to make getting into software
            development easier. We provide you with a number of projects to work
            on and give you a more objective view of your progress and
            abilities.
          </p>
          <p className="about_body">
            Currently our app is in alpha-stages. We've provided a rough
            timeline below, which we hope to follow to the best of our ability.
          </p>
          <h1 className="about_header">Alpha</h1>
          <p className="about_body">
            We began work on the app on April 23, 2020. Because the alpha
            version simply includes all work up to present day, we don't count
            any specific features as belonging to it. During this time there was
            one developer working on the project, and the purpose of it was
            mostly personal interest.
          </p>
          <h1 className="about_header">Version 1.0</h1>
          <p className="about_body">
            Version 1.0 is the first widely usable and stable version. This
            release was created by one developer as a personal project.
          </p>
          <p className="about_body">
            Expected Release:
            <span className="expected_release_date"> June 27, 2020</span>
          </p>
          <h2 className="about_features">Release Features</h2>
          <ul className="features_bullets">
            <li>Tasks and lists of tasks</li>
            <li>Friendlist and teammate list</li>
            <li>Messaging and message editing</li>
            <li>Code editing and sharing</li>
            <li>Project joining and posting</li>
            <li>Personal, unlisted projects</li>
            <li>Mobile version</li>
          </ul>
          <h2 className="about_features">Future Features</h2>
          <ul className="features_bullets">
            <li>Group chats</li>
            <li>Group code editing</li>
            <li>Improved code editing UI</li>
            <li>Shared tasks</li>
            <li>Separable friend and team lists</li>
            <li>Improved mobile experience</li>
            <li>Code optimization</li>
            <li>Message change log</li>
            <li>Separable friend and team chats</li>
            <li>Image messages</li>
            <li>Profile icons</li>
            <li>Automatic code completion</li>
            <li>Code highlighting</li>
            <li>Emojis</li>
            <li>Payment option for projects</li>
            <li>Various payment methods available for project creators</li>
            <li>Concept: Invisible server monitoring</li>
            <li>Batch task selection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default compose(graphql(userQuery, { name: "userQuery" }))(About);
