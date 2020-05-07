import React, { createContext, useState } from "react";
import "./App.scss";
import ApolloClient from "apollo-boost";
import { InitialScreen } from "./components/InitialScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { ApolloProvider } from "react-apollo";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Projects } from "./components/Projects";
import Profile from "./components/Profile";
import ProjectPage from "./components/ProjectPage";
import { AdminProjectPage } from "./components/AdminProjectPage";

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

  const [projectMapper, setProjectMapper] = useState([]);
  const [userProjects, setUserProjectMapper] = useState([]);

  function routeDriller(projects: any) {
    setProjectMapper(projects);
  }

  function adminDriller(userProjects: any) {
    setUserProjectMapper(userProjects);
  }

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
                  <Projects routeDriller={routeDriller} />
                </Route>
                <Route path="/profile">
                  <Profile adminDriller={adminDriller} />
                </Route>
                <Switch>
                  {userProjects.map((el: any) => (
                    <Route exact path={`/contributor/${el.id}`}>
                      <AdminProjectPage
                        id={el.id}
                        title={el.title}
                        content={el.content}
                      />
                    </Route>
                  ))}
                </Switch>
                <Switch>
                  {projectMapper.map((el: any) => (
                    <Route path={`/${el.id}`}>
                      <ProjectPage
                        id={el.id}
                        title={el.title}
                        content={el.content}
                      />
                    </Route>
                  ))}
                </Switch>
              </div>
            </Router>
          </ApolloProvider>
        </userContext.Provider>
      </friendContext.Provider>
    </teammateContext.Provider>
  );
}

export default App;
