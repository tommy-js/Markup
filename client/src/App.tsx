import React, { createContext, useState, useEffect } from "react";
import "./App.scss";
import ApolloClient from "apollo-boost";
import { InitialScreen } from "./components/initial/InitialScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import { ApolloProvider } from "react-apollo";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Projects from "./components/projects/Projects";
import { Redirect } from "./components/navigation/Redirect";
import Profile from "./components/profile/Profile";
import ProjectPage from "./components/projects/ProjectPage";
import { AdminProjectPage } from "./components/projects/AdminProjectPage";
import { NewProject } from "./components/projects/NewProject";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

export const userContext = createContext<any>({});
export const friendContext = createContext<any>({});
export const teammateContext = createContext<any>({});
export const loggedInContext = createContext<any>({});

function App(): JSX.Element {
  const [userVal, setUserVal] = useState<any>({});
  const [userFriends, setUserFriends] = useState<any>([]);
  const [userTeammates, setUserTeammates] = useState<any>([]);
  const [loggedIn, setLoggedIn] = useState<any>(false);

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
          <loggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
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
                  <Route path="/Profile">
                    <Redirect />
                  </Route>
                  <Route path="/projects">
                    <Projects routeDriller={routeDriller} />
                  </Route>
                  <Route path={`/profile`}>
                    <Profile
                      passedId={userVal.id}
                      adminDriller={adminDriller}
                    />
                  </Route>
                  <Route path={`/newproject`}>
                    <NewProject />
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
          </loggedInContext.Provider>
        </userContext.Provider>
      </friendContext.Provider>
    </teammateContext.Provider>
  );
}

export default App;
