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

const MessageQuery = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    id: { type: GraphQLID },
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
    password: { type: GraphQLString }
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
      type: UserQuery,
      args: { id: { type: GraphQLID } },
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
        content: { type: GraphQLString }
      },
      resolve(parent, args) {
        let newMessage = new Message({
          id: args.id,
          content: args.content
        });
        return newMessage.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
