import React, { createContext, useState } from "react";
import "./App.scss";
import ApolloClient from "apollo-boost";
import { InitialScreen } from "./components/InitialScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { ApolloProvider } from "react-apollo";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Projects } from "./components/Projects";
import { Profile } from "./components/Profile";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

export const userContext = createContext<any>({});
export const friendContext = createContext<any>({});
export const teammateContext = createContext<any>({});

function App(): JSX.Element {
  const [userVal, setUserVal] = useState<any>({});
  const [userFriends, setUserFriends] = useState<any>([]);
  const [userTeammates, setUserTeammates] = useState<any>([]);
  return (
    <teammateContext.Provider value={{ userTeammates, setUserTeammates }}>
      <friendContext.Provider value={{ userFriends, setUserFriends }}>
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
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/contact">
                  <Contact />
                </Route>
                <Route path="/projects">
                  <Projects />
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
              </div>
            </Router>
          </ApolloProvider>
        </userContext.Provider>
      </friendContext.Provider>
    </teammateContext.Provider>
  );
}

export default App;
