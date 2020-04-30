const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt
} = graphql;
const Message = require("../models/messages");
const User = require("../models/user");
const Friend = require("../models/friends");
const Task = require("../models/tasks");

const MessageQuery = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    id: { type: GraphQLID },
    from: { type: GraphQLID },
    to: { type: GraphQLID },
    content: { type: GraphQLString },
    timestamp: { type: GraphQLID }
  })
});

const UserQuery = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    friends: { type: new GraphQLList(FriendQuery) }
  })
});

const FriendQuery = new GraphQLObjectType({
  name: "Friend",
  fields: () => ({
    userId: { type: GraphQLID },
    id: { type: GraphQLID },
    name: { type: GraphQLString }
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
    getMessages: {
      type: new GraphQLList(MessageQuery),
      args: {
        fromId: { type: GraphQLID },
        toId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Message.find({ to: args.toId, from: args.fromId });
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
    },
    tasks: {
      type: new GraphQLList(TaskQuery),
      args: { userid: { type: GraphQLID } },
      resolve(parent, args) {
        return Task.find({ userid: args.userid });
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
        to: { type: GraphQLID },
        from: { type: GraphQLID },
        content: { type: GraphQLString },
        timestamp: { type: GraphQLID }
      },
      resolve(parent, args) {
        let newMessage = new Message({
          id: args.id,
          from: args.from,
          to: args.to,
          content: args.content,
          timestamp: args.timestamp
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
    },
    deleteTask: {
      type: TaskQuery,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Task.findOneAndDelete({ id: args.id });
      }
    },
    addFriend: {
      type: FriendQuery,
      args: {
        userId: { type: GraphQLID },
        id: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.update(
          { id: args.userId },
          { $push: { friends: { id: args.id, name: args.name } } }
        );
      }
    },
    removeFriend: {
      type: FriendQuery,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Friend.findOneAndDelete({ id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
