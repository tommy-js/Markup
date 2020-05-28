const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt
} = graphql;
const Message = require("../models/messages");
const User = require("../models/user");
const Friend = require("../models/friends");
const Task = require("../models/tasks");
const Project = require("../models/project");
const Session = require("../models/session");
const Code = require("../models/code");
const FriendRequest = require("../models/friendreq");

const FriendRequestQuery = new GraphQLObjectType({
  name: "FriendRequest",
  fields: () => ({
    toId: { type: GraphQLID },
    fromId: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

const CodeQuery = new GraphQLObjectType({
  name: "Code",
  fields: () => ({
    id: { type: GraphQLID },
    from: { type: GraphQLID },
    to: { type: GraphQLID },
    content: { type: GraphQLString },
    timestamp: { type: GraphQLID }
  })
});

const MessageQuery = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    id: { type: GraphQLID },
    from: { type: GraphQLID },
    to: { type: GraphQLID },
    content: { type: GraphQLString },
    timestamp: { type: GraphQLID },
    edited: { type: GraphQLBoolean }
  })
});

const SettingsQuery = new GraphQLObjectType({
  name: "Settings",
  fields: () => ({
    savedata: { type: GraphQLBoolean }
  })
});

const UserQuery = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    salt: { type: GraphQLString },
    friends: { type: new GraphQLList(FriendQuery) },
    teammates: { type: new GraphQLList(FriendQuery) },
    tasks: { type: new GraphQLList(TaskQuery) },
    projects: { type: new GraphQLList(ProjectQuery) },
    usersettings: { type: new GraphQLList(SettingsQuery) }
  })
});

const SessionQuery = new GraphQLObjectType({
  name: "Session",
  fields: () => ({
    session_id: { type: GraphQLString }
  })
});

const ProjectQuery = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    joined: { type: GraphQLID },
    total: { type: GraphQLID },
    timestamp: { type: GraphQLID },
    stack: { type: GraphQLString }
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
    userId: { type: GraphQLID },
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
    getUsers: {
      type: new GraphQLList(UserQuery),
      args: {
        username: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.find({ username: args.username });
      }
    },
    getFriendRequests: {
      type: new GraphQLList(FriendRequestQuery),
      args: {
        toId: { type: GraphQLID },
        fromId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return FriendRequest.find({ toId: args.toId });
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
    getCode: {
      type: new GraphQLList(CodeQuery),
      args: {
        fromId: { type: GraphQLID },
        toId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Code.find({ to: args.toId, from: args.fromId });
      }
    },
    projects: {
      type: new GraphQLList(ProjectQuery),
      args: {
        stack: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Project.find({ stack: args.stack });
      }
    },
    user: {
      type: UserQuery,
      args: { username: { type: GraphQLString }, id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findOne({ username: args.username, id: args.id });
      }
    },
    users: {
      type: new GraphQLList(UserQuery),
      resolve(parent, args) {
        return User.find({});
      }
    },
    getSessionID: {
      type: GraphQLString,
      args: {
        session_id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Session.find({ session_id: args.session_id });
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
        password: { type: GraphQLString },
        salt: { type: GraphQLString }
      },
      resolve(parent, args) {
        let newUser = new User({
          id: args.id,
          username: args.username,
          password: args.password,
          salt: args.salt
        });
        return newUser.save();
      }
    },
    addSessionId: {
      type: SessionQuery,
      args: {
        session_id: { type: GraphQLString }
      },
      resolve(parent, args) {
        let newSession = new Session({
          session_id: args.session_id
        });
        return newSession.save();
      }
    },
    addProject: {
      type: ProjectQuery,
      args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        joined: { type: GraphQLID },
        total: { type: GraphQLID },
        timestamp: { type: GraphQLID },
        stack: { type: GraphQLString },
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        let newProject = new Project({
          title: args.title,
          content: args.content,
          joined: args.joined,
          total: args.total,
          timestamp: args.timestamp,
          stack: args.stack,
          id: args.id
        });
        return newProject.save();
      }
    },
    addMessage: {
      type: MessageQuery,
      args: {
        id: { type: GraphQLID },
        to: { type: GraphQLID },
        from: { type: GraphQLID },
        content: { type: GraphQLString },
        timestamp: { type: GraphQLID },
        edited: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        let newMessage = new Message({
          id: args.id,
          from: args.from,
          to: args.to,
          content: args.content,
          timestamp: args.timestamp,
          edited: args.edited
        });
        return newMessage.save();
      }
    },
    addCode: {
      type: CodeQuery,
      args: {
        id: { type: GraphQLID },
        to: { type: GraphQLID },
        from: { type: GraphQLID },
        content: { type: GraphQLString },
        timestamp: { type: GraphQLID }
      },
      resolve(parent, args) {
        let newCode = new Code({
          id: args.id,
          from: args.from,
          to: args.to,
          content: args.content,
          timestamp: args.timestamp
        });
        return newCode.save();
      }
    },
    addTask: {
      type: TaskQuery,
      args: {
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
        content: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.update(
          { id: args.userId },
          { $push: { tasks: { id: args.id, content: args.content } } }
        );
      }
    },
    changeMessage: {
      type: MessageQuery,
      args: {
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        edited: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        return Message.findOneAndUpdate(
          { id: args.id },
          { $set: { content: args.content, edited: args.edited } },
          { upsert: true, new: true }
        );
      }
    },
    changeCode: {
      type: CodeQuery,
      args: {
        id: { type: GraphQLID },
        content: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Code.findOneAndUpdate(
          { id: args.id },
          { $set: { content: args.content } },
          { upsert: true, new: true }
        );
      }
    },
    addFriendRequest: {
      type: FriendRequestQuery,
      args: {
        fromId: { type: GraphQLID },
        toId: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        let newReq = new FriendRequest({
          toId: args.toId,
          fromId: args.fromId,
          name: args.name
        });
        return newReq.save();
      }
    },
    addUserProject: {
      type: ProjectQuery,
      args: {
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        timestamp: { type: GraphQLID }
      },
      resolve(parent, args) {
        return User.update(
          { id: args.userId },
          {
            $push: {
              projects: {
                id: args.id,
                content: args.content,
                title: args.title,
                timestamp: args.timestamp
              }
            }
          }
        );
      }
    },
    deleteTask: {
      type: TaskQuery,
      args: {
        userId: { type: GraphQLID },
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return User.update(
          { id: args.userId },
          { $pull: { tasks: { id: args.id } } }
        );
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
        userId: { type: GraphQLID },
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return User.update(
          { id: args.userId },
          { $pull: { friends: { id: args.id } } }
        );
      }
    },
    addTeammate: {
      type: FriendQuery,
      args: {
        userId: { type: GraphQLID },
        id: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.update(
          { id: args.userId },
          { $push: { teammates: { id: args.id, name: args.name } } }
        );
      }
    },
    removeTeammate: {
      type: FriendQuery,
      args: {
        userId: { type: GraphQLID },
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return User.update(
          { id: args.userId },
          { $pull: { teammates: { id: args.id } } }
        );
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
