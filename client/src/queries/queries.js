import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const messageQuery = gql`
  query {
    messages
    sender
  }
`;

const addMessageMutation = gql`
  mutation($id: ID!, $content: String!) {
    addMessage(id: $id, content: $content) {
      id
      content
    }
  }
`;

const addUserMutation = gql`
  mutation($id: ID!, $username: String!, $password: String!) {
    addUser(id: $id, username: $username, password: $password) {
      id
      username
      password
    }
  }
`;

export { messageQuery, addMessageMutation, addUserMutation };
