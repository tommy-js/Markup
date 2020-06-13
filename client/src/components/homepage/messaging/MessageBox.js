import React, { useState, useContext, useEffect } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { userContext } from "../../../App";
import { rememberUserContext } from "../../../App";
import {
  getConversationQuery,
  getSpecConversation
} from "../../../queries/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import InputBox from "./InputBox.js";
import { InitialBox } from "./InitialBox";
import alphabet from "../../../icons/alphabet.png";
import addCode from "../../../icons/code.png";
import { MessageBoot } from "./MessageBoot";
import { CodeModal } from "./CodeModal.js";
import "../../../App.scss";

export function MessageBox(props) {
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
  const [convoId, setConvoId] = useState();
  const [getConvo, { data, loading }] = useLazyQuery(getSpecConversation, {
    pollInterval: 100
  });

  useEffect(() => {
    if (userVal.conversations) {
      console.log("userval confo");
      let convo = userVal.conversations;
      let foundVar = convo.find(el => el.to === props.id);
      let arrIndex = convo.indexOf(foundVar);
      let currentConversation = convo[arrIndex].id;
      getConvo({ variables: { id: currentConversation } });
      setConvoId(currentConversation);
      console.log("current convo: " + currentConversation);
      console.log(foundVar);
      console.log(arrIndex);
      console.log(currentConversation);
    }
  }, []);

  useEffect(() => {
    if (data) {
      if (data.getConversation.messages != conversation) {
        setConversation(data.getConversation.messages);
      }
    }
  }, [data]);

  function entryButton(checkVal) {
    if (entryImage === alphabet) {
      setEntryImage(addCode);
      setVal(checkVal);
    } else if (entryImage === addCode) {
      setEntryImage(alphabet);
      setVal(checkVal);
    }
  }

  function updateCode(val) {
    setInnerCode(val);
  }

  function deleteCode() {
    entryButton(false);
    setInnerCode("");
  }

  function modInput(input) {
    let arr = conversation;
    arr.push(input);
    setConversation(arr);
  }

  function modal() {
    if (val === true) {
      return (
        <div>
          <CodeModal innerCode={innerCode} />
        </div>
      );
    } else {
      return null;
    }
  }

  if (!loading) {
    if (conversation.length == 0) {
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
            <MessageBoot messageArray={conversation} userVal={userVal.id} />
          </div>
          <InputBox
            modInput={modInput}
            convoId={convoId}
            userId={props.id}
            val={val}
            entryImage={entryImage}
            entryButton={entryButton}
          />
        </div>
      );
    }
  } else {
    return null;
  }
}

export default compose(
  graphql(getSpecConversation, {
    name: "getSpecConversation"
  })
)(MessageBox);
