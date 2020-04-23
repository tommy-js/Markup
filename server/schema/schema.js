const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema } = graphql;
const Messages = require("../models/messages");

const MessageQuery = new GraphQLObjectType({
  name: "Messages",
  fields: () => ({
    id: { type: GraphQLID },
    to: { type: GraphQLString },
    from: { type: GraphQLString }
  })
});

const RootQuery = new GraphqlObject({
  name: "RootQuery",
  fields: {
    messages: {
      type: MessageQuery,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Messages.findById(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
