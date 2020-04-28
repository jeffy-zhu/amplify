import React from "react";
import "./App.css";
import AmplifyComponent from "./components/AmplifyComponent";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchMusicComponent from "./components/SearchMusicComponent";

function App() {
  return (
    <div className="container-fluid">
      <Router>
        <Route path="/" exact={true} component={AmplifyComponent} />
        <Route
          path="/search/:searchItem"
          exact={true}
          component={SearchMusicComponent}
        />
      </Router>
    </div>
  );
}

export default App;

//render={(props) => <AmplifyComponent {...props} />}
