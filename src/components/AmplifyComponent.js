import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchMusicComponent from "./SearchMusicComponent";

class AmplifyComponent extends React.Component {
  state = {
    searchItem: "",
  };

  render() {
    return (
      <div>
        <h1>Welcome to Amplify!</h1>
        <input className="form-control" />
        <button onClick={() => this.props.history.push("/ITWORKS")}>
          Submit
        </button>
      </div>
    );
  }
}

export default AmplifyComponent;
