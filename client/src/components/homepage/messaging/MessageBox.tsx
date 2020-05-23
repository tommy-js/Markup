import React, { useState, useContext, useEffect } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { userContext } from "../../../App";
import { rememberUserContext } from "../../../App";
import { getMessageQuery } from "../../../queries/queries";
import { useQuery } from "@apollo/react-hooks";
import InputBox from "./InputBox.js";
import { InitialBox } from "./InitialBox";
import alphabet from "../../../icons/alphabet.png";
import addCode from "../../../icons/code.png";
import { MessageBoot } from "./MessageBoot";
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
  const [val, setVal] = useState(false);
  const [innerCode, setInnerCode] = useState("");
  const [entryImage, setEntryImage] = useState(addCode);
  const { userVal, setUserVal } = useContext(userContext);
  const { rememberedUser, setRememberedUser } = useContext(rememberUserContext);
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
      setRememberedUser({ id: props.id });
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

  function entryButton(checkVal: boolean) {
    if (entryImage === alphabet) {
      setEntryImage(addCode);
      setVal(checkVal);
    } else if (entryImage === addCode) {
      setEntryImage(alphabet);
      setVal(checkVal);
    }
  }

  function deleteCode() {
    entryButton(false);
    setInnerCode("");
  }

  function refetchQuery() {
    refetch();
  }

  function modal() {
    if (val === true) {
      return (
        <div className="code_modal">
          <div className="code_modal_inner_block">
            <textarea
              className="code_modal_textarea"
              value={innerCode}
              onChange={e => setInnerCode(e.target.value)}
            />
            <button onClick={() => deleteCode()}>Delete</button>
            <button>Save</button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  if (recMessage.length == 0 && userMessages.length == 0) {
    return (
      <div>
        <div className="message_container">
          <p className="start_of_messages">
            This is the start of your messages...
          </p>
        </div>
        <InputBox
          userId={props.id}
          refetchQuery={refetchQuery}
          val={val}
          entryImage={entryImage}
          entryButton={entryButton}
        />
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
          {modal()}
          <div>
            <MessageBoot sortedArray={sortedArray} userVal={userVal.id} />
          </div>
          <InputBox
            userId={props.id}
            refetchQuery={refetchQuery}
            val={val}
            entryImage={entryImage}
            entryButton={entryButton}
          />
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
