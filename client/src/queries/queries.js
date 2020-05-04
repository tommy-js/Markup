import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const messageQuery = gql`
  {
    messages {
      from
    }
  }
`;

const getMessageQuery = gql`
  query($toId: ID!, $fromId: ID!) {
    getMessages(toId: $toId, fromId: $fromId) {
      to
      from
      content
      timestamp
    }
  }
`;

const userQuery = gql`
  query($username: String!) {
    user(username: $username) {
      username
      password
      id
      friends {
        id
        name
      }
    }
  }
`;

const getUsers = gql`
  query($username: String!) {
    getUsers(username: $username) {
      username
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
  mutation($id: ID!, $content: String!, $to: ID!, $from: ID!, $timestamp: ID!) {
    addMessage(
      id: $id
      content: $content
      to: $to
      from: $from
      timestamp: $timestamp
    ) {
      id
      to
      from
      content
      timestamp
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

const addFriendMutation = gql`
  mutation($userId: ID!, $id: ID!, $name: String) {
    addFriend(userId: $userId, id: $id, name: $name) {
      userId
      id
      name
    }
  }
`;

const removeFriendMutation = gql`
  mutation($userId: ID!, $id: ID!) {
    removeFriend(userId: $userId, id: $id) {
      userId
      id
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
  getMessageQuery,
  allUsersQuery,
  getUsers,
  addMessageMutation,
  addTaskMutation,
  addUserMutation,
  removeTaskMutation,
  addFriendMutation,
  removeFriendMutation
};
