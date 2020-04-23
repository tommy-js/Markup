const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema } = graphql;
const Message = require("../models/messages");
const User = require("../models/user");

const MessageQuery = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    id: { type: GraphQLID },
    to: { type: GraphQLString },
    from: { type: GraphQLString },
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
      type: MessageQuery,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Messages.findById(args.id);
      }
    },
    user: {
      type: UserQuery,
      args: { username: { type: GraphQLString } },
      resolve(parent, args) {
        return User.find(el => el.username === args.username);
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
      resolve(parents, args) {
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
        to: { type: GraphQLString },
        from: { type: GraphQLString },
        content: { type: GraphQLString }
      },
      resolve(parents, args) {
        let newMessage = new Message({
          id: args.id,
          to: args.to,
          from: args.from,
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
