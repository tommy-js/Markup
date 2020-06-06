import React, { useState, useEffect } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { createConversationQuery } from "../../queries/queries";

function CreateConversation(props) {
  const [maxSend, setMaxSend] = useState(0);

  function returnFunc() {
    if (props.createThis === true && maxSend < 2) {
      console.log("passing createconversation");
      props.createConversationQuery({
        variables: {
          id: Math.floor(Math.random() * 100000)
        }
      });
      setMaxSend(999);
    }
  }

  return <div>{returnFunc()}</div>;
}

export default compose(
  graphql(createConversationQuery, { name: "createConversationQuery" })
)(CreateConversation);
