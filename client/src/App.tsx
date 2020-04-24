import React, { Context, createContext } from "react";
import "./App.scss";
import ApolloClient from "apollo-boost";
import { InitialScreen } from "./components/InitialScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const user = createContext("user");

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Route exact path="/">
            <InitialScreen />
          </Route>
          <Route exact path="/home">
            <HomePage />
          </Route>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
