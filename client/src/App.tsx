import React, { createContext, useState } from "react";
import "./App.scss";
import ApolloClient from "apollo-boost";
import { InitialScreen } from "./components/InitialScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

export const userContext = createContext<any>({});

function App(): JSX.Element {
  const [userVal, setUserVal] = useState<any>({});
  return (
    <userContext.Provider value={{ userVal, setUserVal }}>
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <Route exact path="/">
              <InitialScreen />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
          </div>
        </Router>
      </ApolloProvider>
    </userContext.Provider>
  );
}

export default App;
