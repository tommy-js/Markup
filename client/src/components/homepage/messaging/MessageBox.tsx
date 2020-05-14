import React, { useState, useContext, useEffect } from "react";
import IndividualMessage from "./IndividualMessage";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { userContext } from "../../../App";
import { getMessageQuery } from "../../../queries/queries";
import { useQuery } from "@apollo/react-hooks";
import InputBox from "./InputBox.js";
import { InitialBox } from "./InitialBox";
import "../../../App.scss";

interface Props {
  name: String;
  id: Number;
  getMessages: () => object;
}

const MessageBox: React.FC<Props> = props => {
  const [userMessages, setUserMessages] = useState([
    "This is the start of your conversation..."
  ]);
  const [recMessage, setRecMessage] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const { userVal, setUserVal } = useContext(userContext);
  const { loading: loading1, data: data1, refetch } = useQuery(
    getMessageQuery,
    {
      variables: { toId: props.id, fromId: userVal.id }
    }
  );
  const { loading: loading2, data: data2 } = useQuery(getMessageQuery, {
    variables: {
      toId: userVal.id,
      fromId: props.id
    }
  });

  useEffect(() => {
    if (!loading1 && !loading2) {
      if (data1.getMessages && data2.getMessages) {
        setUserMessages(data1.getMessages);
        setRecMessage(data2.getMessages);
        setMessageBounds();
      } else {
        setUserMessages(["This is the start of your conversation..."]);
      }
    }
  }, [data1, data2]);

  function setMessageBounds() {
    let matrixArray = [];
    matrixArray = data1.getMessages.concat(data2.getMessages);
    matrixArray.sort(function(a: any, b: any) {
      return a.timestamp - b.timestamp;
    });
    matrixArray.length = 50;
    setSortedArray(matrixArray);
  }

  function refetchQuery() {
    refetch();
  }

  if (recMessage.length == 0 && userMessages.length == 0) {
    return (
      <div>
        <div className="message_container">
          <p className="start_of_messages">
            This is the start of your messages...
          </p>
        </div>
        <InputBox userId={props.id} refetchQuery={refetchQuery} />
      </div>
    );
  }
  if (!loading1 && !loading2) {
    if (sortedArray.length < 1) {
      return (
        <div className="message_box">
          <InitialBox />
        </div>
      );
    } else {
      return (
        <div className="message_box">
          <div className="message_container">
            {sortedArray.map((messages: any) => (
              <IndividualMessage
                userid={userVal.id}
                receiver={messages.to}
                sender={messages.from}
                key={Math.floor(Math.random() * 10000)}
                message={messages.content}
                timestamp={messages.timestamp}
                id={messages.id}
              />
            ))}
          </div>
          <InputBox userId={props.id} refetchQuery={refetchQuery} />
        </div>
      );
    }
  } else {
    return <div>Loading...</div>;
  }
};

export default compose(
  graphql(getMessageQuery, {
    name: "getMessages",
    options: { pollInterval: 200 }
  })
)(MessageBox);
