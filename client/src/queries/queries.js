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
      id
    }
  }
`;

const getOpenProjectsQuery = gql`
  query($stack: String!) {
    projects(stack: $stack) {
      stack
      timestamp
      joined
      total
      title
      content
      id
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
      tasks {
        id
        content
      }
      teammates {
        id
        name
      }
      userprojects {
        id
        timestamp
        title
        content
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

const removeTaskMutation = gql`
  mutation($userId: ID!, $id: ID!) {
    deleteTask(userId: $userId, id: $id) {
      id
      userId
    }
  }
`;

const addProjectMutation = gql`
  mutation(
    $timestamp: ID!
    $total: ID!
    $joined: ID!
    $stack: String
    $content: String!
    $title: String!
    $id: ID!
  ) {
    addProject(
      timestamp: $timestamp
      total: $total
      joined: $joined
      stack: $stack
      content: $content
      title: $title
      id: $id
    ) {
      timestamp
      id
      content
      title
      total
      joined
      stack
    }
  }
`;

const addProjectUserMutation = gql`
  mutation(
    $timestamp: ID!
    $id: ID!
    $title: String
    $content: String
    $userId: ID!
  ) {
    addUserProject(
      timestamp: $timestamp
      id: $id
      title: $title
      content: $content
      userId: $userId
    ) {
      timestamp
      id
      title
      content
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

const changeMessageMutation = gql`
  mutation($content: String!, $id: ID!) {
    changeMessage(content: $content, id: $id) {
      content
      id
    }
  }
`;

const addTaskMutation = gql`
  mutation($id: ID!, $userId: ID!, $content: String!) {
    addTask(id: $id, userId: $userId, content: $content) {
      id
      userId
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

const addTeammateMutation = gql`
  mutation($userId: ID!, $id: ID!, $name: String!) {
    addTeammate(userId: $userId, id: $id, name: $name) {
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

const removeTeammateMutation = gql`
  mutation($userId: ID!, $id: ID!) {
    removeTeammate(userId: $userId, id: $id) {
      userId
      id
    }
  }
`;

const addUserMutation = gql`
  mutation($id: ID!, $username: String!, $password: String!, $salt: String!) {
    addUser(id: $id, username: $username, password: $password, salt: $salt) {
      id
      username
      password
      salt
      friends {
        id
        name
      }
      tasks {
        id
        content
      }
      teammates {
        id
        name
      }
      userprojects {
        id
        timestamp
        title
        content
      }
    }
  }
`;

const addSessionIDMutation = gql`
  mutation($session_id: String!) {
    addSessionId(session_id: $session_id) {
      session_id
    }
  }
`;

const getSessionIDQuery = gql`
  query($session_id: String!) {
    getSessionID(session_id: $session_id) {
      session_id
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
  getMessageQuery,
  allUsersQuery,
  getOpenProjectsQuery,
  getUsers,
  getSessionIDQuery,
  addMessageMutation,
  addTaskMutation,
  addUserMutation,
  removeTaskMutation,
  addFriendMutation,
  changeMessageMutation,
  addTeammateMutation,
  addProjectMutation,
  removeFriendMutation,
  removeTeammateMutation,
  addProjectUserMutation,
  addSessionIDMutation
};
