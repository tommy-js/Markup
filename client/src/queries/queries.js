const gql = require("graphql-apollo");

const messageQuery = gql`
  query {
    messages
    sender
  }
`;

const addMessageMutation = gql`
  mutation($id: ID!, $content: String!) {
    addMessage(id: $id, content: $content, to: "Tyler", from: "Alex") {
      id
      content
      to
      from
    }
  }
`;

export { messageQuery, addMessageMutation };
