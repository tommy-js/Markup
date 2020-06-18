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
const ProjectMember = require("../models/ProjectMember");
const Conversation = require("../models/conversation");
const Contributers = require("../models/contributers");
const FriendRequestToUser = require("../models/friendreqtouser");
const Documents = require("../models/documents");
const UserAccess = require("../models/useraccess");
const Update = require("../models/updates");

const UserAccessQuery = new GraphQLObjectType({
  name: "UserAccess",
  fields: () => ({
    id: { type: GraphQLID }
  })
});

const UpdateQuery = new GraphQLObjectType({
  name: "Update",
  fields: () => ({
    content: { type: GraphQLString },
    userId: { type: GraphQLID },
    timestamp: { type: GraphQLID }
  })
});

const DocumentsQuery = new GraphQLObjectType({
  name: "Documents",
  fields: () => ({
    id: { type: GraphQLID },
    projectId: { type: GraphQLID },
    name: { type: GraphQLString },
    update: { type: new GraphQLList(UpdateQuery) }
  })
});

const FriendRequestToUserQuery = new GraphQLObjectType({
  name: "FriendRequestToUser",
  fields: () => ({
    id: { type: GraphQLID }
  })
});

const FriendRequestQuery = new GraphQLObjectType({
  name: "FriendRequest",
  fields: () => ({
    toId: { type: GraphQLID },
    fromId: { type: GraphQLID },
    name: { type: GraphQLString },
    timestamp: { type: GraphQLID }
  })
});

const ProjectMemberQuery = new GraphQLObjectType({
  name: "ProjectMember",
  fields: () => ({
    id: { type: GraphQLID },
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
    userId: { type: GraphQLID },
    from: { type: GraphQLID },
    to: { type: GraphQLID },
    messageId: { type: GraphQLID },
    content: { type: GraphQLString },
    timestamp: { type: GraphQLID },
    edited: { type: GraphQLBoolean }
  })
});

const ContributersQuery = new GraphQLObjectType({
  name: "Contributers",
  fields: () => ({
    contribId: { type: GraphQLID }
  })
});

const ConversationQuery = new GraphQLObjectType({
  name: "Conversation",
  fields: () => ({
    id: { type: GraphQLID },
    to: { type: GraphQLID },
    contributers: { type: new GraphQLList(ContributersQuery) },
    messages: { type: new GraphQLList(MessageQuery) }
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
    usersettings: { type: new GraphQLList(SettingsQuery) },
    conversations: { type: new GraphQLList(ConversationQuery) },
    friendrequests: { type: new GraphQLList(FriendRequestToUserQuery) }
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
    leadId: { type: GraphQLID },
    leadName: { type: GraphQLString },
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    joined: { type: GraphQLID },
    total: { type: GraphQLID },
    timestamp: { type: GraphQLID },
    stack: { type: GraphQLString },
    members: { type: new GraphQLList(ProjectMemberQuery) }
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
    getProjectById: {
      type: ProjectQuery,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Project.findOne({ id: args.id });
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
    documents: {
      type: new GraphQLList(DocumentsQuery),
      args: {
        projectId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Documents.find({ projectId: args.projectId });
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
    conversations: {
      type: ConversationQuery,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Conversation.findOne({ id: args.id });
      }
    },
    getConversation: {
      type: ConversationQuery,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Conversation.findOne({ id: args.id });
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
    getProjects: {
      type: new GraphQLList(ProjectQuery),
      resolve(parent) {
        return Project.find({});
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
        leadId: { type: GraphQLID },
        leadName: { type: GraphQLString },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        joined: { type: GraphQLID },
        total: { type: GraphQLID },
        timestamp: { type: GraphQLID },
        stack: { type: GraphQLString },
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
        username: { type: GraphQLString }
      },
      resolve(parent, args) {
        let newProject = new Project({
          leadId: args.leadId,
          leadName: args.leadName,
          title: args.title,
          content: args.content,
          joined: args.joined,
          total: args.total,
          timestamp: args.timestamp,
          stack: args.stack,
          id: args.id,
          members: [{ id: args.userId, name: args.username }]
        });
        return newProject.save();
      }
    },
    projectMemberPush: {
      type: ProjectMemberQuery,
      args: {
        projId: { type: GraphQLID },
        id: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Project.update(
          { id: args.projId },
          { $push: { id: args.id, name: args.name } }
        );
      }
    },
    changeDocument: {
      type: DocumentsQuery,
      args: {
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        userId: { type: GraphQLID },
        timestamp: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Documents.update(
          { id: args.id },
          {
            $push: {
              update: {
                content: args.content,
                userId: args.userId,
                timestamp: args.timestamp
              }
            }
          }
        );
      }
    },
    addDocument: {
      type: DocumentsQuery,
      args: {
        id: { type: GraphQLID },
        projectId: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        let newDoc = new Documents({
          id: args.id,
          projectId: args.projectId,
          name: args.name
        });
        return newDoc.save();
      }
    },
    deleteDocument: {
      type: DocumentsQuery,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Documents.deleteOne({ id: args.id });
      }
    },
    pushUserFriendRequest: {
      type: FriendRequestToUserQuery,
      args: {
        userId: { type: GraphQLID },
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return User.update(
          { id: args.userId },
          { $push: { friendrequests: { id: args.id } } }
        );
      }
    },
    pullUserFriendRequest: {
      type: FriendRequestToUserQuery,
      args: {
        userId: { type: GraphQLID },
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return User.update(
          { id: args.userId },
          { $pull: { friendrequests: { id: args.id } } }
        );
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
    pushMessage: {
      type: MessageQuery,
      args: {
        id: { type: GraphQLID },
        messageId: { type: GraphQLID },
        userId: { type: GraphQLID },
        timestamp: { type: GraphQLID },
        content: { type: GraphQLString },
        edited: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        return Conversation.update(
          { id: args.id },
          {
            $push: {
              messages: {
                userId: args.userId,
                messageId: args.messageId,
                timestamp: args.timestamp,
                content: args.content,
                edited: false
              }
            }
          }
        );
      }
    },
    createConversation: {
      type: ConversationQuery,
      args: {
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
        secondId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let newConvo = new Conversation({
          id: args.id,
          contributers: [
            {
              contribId: args.userId
            },
            {
              contribId: args.secondId
            }
          ]
        });
        return newConvo.save();
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
        messageId: { type: GraphQLID },
        content: { type: GraphQLString },
        edited: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        return Conversation.findOneAndUpdate(
          { id: args.id },
          { $set: { content: args.content, edited: args.edited } },
          { upsert: true, new: true }
        );
      }
    },
    pullMessage: {
      type: MessageQuery,
      args: {
        id: { type: GraphQLID },
        messageId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Message.deleteOne({ messageId: args.messageId });
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
        name: { type: GraphQLString },
        timestamp: { type: GraphQLID }
      },
      resolve(parent, args) {
        let newReq = new FriendRequest({
          toId: args.toId,
          fromId: args.fromId,
          name: args.name,
          timestamp: args.timestamp
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
        timestamp: { type: GraphQLID },
        leadName: { type: GraphQLString },
        leadId: { type: GraphQLID }
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
                timestamp: args.timestamp,
                leadName: args.leadName,
                leadId: args.leadId
              }
            }
          }
        );
      }
    },
    addConvo: {
      type: ConversationQuery,
      args: {
        userId: { type: GraphQLID },
        id: { type: GraphQLID },
        to: { type: GraphQLID }
      },
      resolve(parent, args) {
        return User.update(
          { id: args.userId },
          {
            $push: {
              conversations: {
                id: args.id,
                to: args.to
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
    deleteProject: {
      type: ProjectQuery,
      args: {
        userId: { type: GraphQLID },
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return User.update(
          { id: args.userId },
          { $pull: { projects: { id: args.id } } }
        );
      }
    },
    deleteFriendRequest: {
      type: FriendRequestQuery,
      args: {
        fromId: { type: GraphQLID },
        toId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return FriendRequest.deleteOne({
          fromId: args.fromId,
          toId: args.toId
        });
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
