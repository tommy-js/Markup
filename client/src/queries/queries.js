import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const messageQuery = gql`
  {
    messages {
      from
    }
  }
`;

const userQuery = gql`
  query($username: String!) {
    user(username: $username) {
      username
      password
      id
    }
  }
`;

const taskQuery = gql`
  query($userid: ID!) {
    tasks(userid: $userid) {
      userid
      id
      content
    }
  }
`;

const removeTaskMutation = gql`
  mutation($id: ID!) {
    deleteTask(id: $id) {
      id
    }
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

const addTaskMutation = gql`
  mutation($id: ID!, $userid: ID!, $content: String!) {
    addTask(id: $id, userid: $userid, content: $content) {
      id
      userid
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

const allUsersQuery = gql`
  {
    users {
      username
      id
    }
  }
`;

export {
  messageQuery,
  userQuery,
  taskQuery,
  allUsersQuery,
  addMessageMutation,
  addTaskMutation,
  addUserMutation,
  removeTaskMutation
};
