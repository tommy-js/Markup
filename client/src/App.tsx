import React, { createContext, useState } from "react";
import { FriendConversation } from "./components/FriendConversation";
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
  const [friends, setFriends] = useState([]);

  function passFriends(friends: any) {
    setFriends(friends);
  }

  const [userVal, setUserVal] = useState<any>({});
  if (friends) {
    return (
      <userContext.Provider value={{ userVal, setUserVal }}>
        <ApolloProvider client={client}>
          <Router>
            <div className="App">
              <Route exact path="/">
                <InitialScreen />
              </Route>
              <Route exact path="/home">
                <HomePage passFriends={passFriends} />
              </Route>
              {friends.map((el: any) => (
                <Route exact path={"/" + el.id}>
                  <FriendConversation />
                </Route>
              ))}
            </div>
          </Router>
        </ApolloProvider>
      </userContext.Provider>
    );
  } else {
    return <div>"Loading..."</div>;
  }
}

export default App;
