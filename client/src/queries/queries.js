const gql = require("graphql-apollo");

const messageQuery = gql`
  query {
    messages
    sender
  }
`;
