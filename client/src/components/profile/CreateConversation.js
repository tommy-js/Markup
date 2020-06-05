import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { createConversationQuery } from "../../queries/queries";

const CreateConversation = props => {
  function passfunc() {
    props.createConversationQuery({
      variables: {
        id: Math.floor(Math.random() * 100000)
      }
    });
  }
  return passfunc();
};

export default compose(
  graphql(createConversationQuery, { name: "createConversationQuery" })
)(CreateConversation);
