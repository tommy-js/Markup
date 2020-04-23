import React from "react";
import "./App.scss";
import { InitialScreen } from "./components/InitialScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";

const App: React.FC = () => {
  return (
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
  );
};

export default App;
