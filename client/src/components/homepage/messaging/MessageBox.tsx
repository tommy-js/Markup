import React, { useState, useContext, useEffect } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { userContext } from "../../../App";
import { rememberUserContext } from "../../../App";
import { getConversationQuery } from "../../../queries/queries";
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
  const [message, setMessage] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [val, setVal] = useState(false);
  const [innerCode, setInnerCode] = useState("");
  const [entryImage, setEntryImage] = useState(addCode);
  const { userVal, setUserVal } = useContext(userContext);
  const { rememberedUser, setRememberedUser } = useContext(rememberUserContext);
  const { data, loading } = useQuery(getConversationQuery, {
    pollInterval: 100
  });

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

  if (conversation.length == 0) {
    return (
      <div>
        <div className="message_container">
          <p className="start_of_messages">
            This is the start of your messages...
          </p>
        </div>
        <InputBox
          userId={props.id}
          val={val}
          entryImage={entryImage}
          entryButton={entryButton}
        />
      </div>
    );
  }
  if (!loading) {
    if (conversation.length < 1) {
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
            <MessageBoot sortedArray={conversation} userVal={userVal.id} />
          </div>
          <InputBox
            userId={props.id}
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
  graphql(getConversationQuery, {
    name: "getMessages",
    options: { pollInterval: 200 }
  })
)(MessageBox);
