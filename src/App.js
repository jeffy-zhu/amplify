import React from "react";
import "./App.css";
import AmplifyComponent from "./components/AmplifyComponent";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchMusicComponent from "./components/SearchMusicComponent";
import { createStore } from "redux";
import searchMusicReducer from "./reducers/SearchMusicReducer";
import { Provider } from "react-redux";

const store = createStore(searchMusicReducer);

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
