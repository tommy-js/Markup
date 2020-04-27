const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

app.use(cors());

mongoose.connect(
  "mongodb+srv://user1:jSmW8tC7oYIRebv9@cluster0-86hxt.mongodb.net/test?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("Connected to the Atlas server");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("listening to port 4000");
});
