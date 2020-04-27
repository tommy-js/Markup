const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList
} = graphql;
const Message = require("../models/messages");
const User = require("../models/user");
const Friend = require("../models/friends");
const Task = require("../models/tasks");

const MessageQuery = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    id: { type: GraphQLID },
    userid: { type: GraphQLID },
    from: { type: GraphQLString },
    to: { type: GraphQLString },
    content: { type: GraphQLString }
  })
});

const UserQuery = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    tasks: { type: new GraphQLList(TaskQuery) }
  })
});

const FriendQuery = new GraphQLObjectType({
  name: "Friend",
  fields: () => ({
    id: { type: GraphQLID }
  })
});

const TaskQuery = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLID },
    userid: { type: GraphQLID },
    content: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    messages: {
      type: new GraphQLList(MessageQuery),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Message.find({});
      }
    },
    user: {
      type: UserQuery,
      args: { username: { type: GraphQLString } },
      resolve(parent, args) {
        return User.findOne({ username: args.username });
      }
    },
    users: {
      type: new GraphQLList(UserQuery),
      resolve(parent, args) {
        return User.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserQuery,
      args: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        let newUser = new User({
          id: args.id,
          username: args.username,
          password: args.password
        });
        return newUser.save();
      }
    },
    addMessage: {
      type: MessageQuery,
      args: {
        id: { type: GraphQLID },
        userid: { type: GraphQLID },
        content: { type: GraphQLString }
      },
      resolve(parent, args) {
        let newMessage = new Message({
          id: args.id,
          userid: args.userid,
          content: args.content
        });
        return newMessage.save();
      }
    },
    addTask: {
      type: TaskQuery,
      args: {
        id: { type: GraphQLID },
        userid: { type: GraphQLID },
        content: { type: GraphQLString }
      },
      resolve(parent, args) {
        let newTask = new Task({
          id: args.id,
          userid: args.userid,
          content: args.content
        });
        return newTask.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
