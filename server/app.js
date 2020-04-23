const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");

const app = express();

app.use(cors());

mongoose.connect(
  "mongodb+srv://seconduser:nMun66YDIEKfctfU@cluster0-86hxt.mongodb.net/test?retryWrites=true&w=majority"
);

mongoose.connection("once", () => {
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
