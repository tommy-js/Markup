import React from "react";
import { MessageBox } from "./MessageBox";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { allUsersQuery } from "../queries/queries";
import "../App.scss";

interface Props {
  searching: boolean;
  viewMessages: () => void;
}

const MessageViewer: React.FC<Props> = props => {
  function backButton() {
    props.viewMessages();
  }

  useEffect(() => {}, [data]);

  if (props.searching) {
    return (
      <div className="message_viewer">
        <p>Searching</p>
        <button onClick={() => backButton()}>Back</button>
      </div>
    );
  } else {
    return (
      <div className="message_viewer">
        <h1 className="message_viewer_header">Your Messages</h1>
        <MessageBox />
      </div>
    );
  }
};

export default compose(graphql(allUsersQuery, { name: "allUsersQuery" }))(
  MessageViewer
);
