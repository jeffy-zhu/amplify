import React from "react";
import "../styles/Amplify.css";
import guitar from "../images/guitar.png";

class AmplifyComponent extends React.Component {
  state = {
    searchItem: "",
  };

  render() {
    return (
      <div className="row">
        <div id="centered" className="col">
          <div id="guitar-welcome-parent">
            <img id="guitar" src={guitar} alt="" />
            <div>
              <h1 id="welcome">Welcome to Amplify!</h1>
              <div id="instructions">Enter the name of an artist or song</div>
              <input
                id="search-input"
                onChange={(e) => this.setState({ searchItem: e.target.value })}
              />
              <button
                id="search-button"
                onClick={() =>
                  this.props.history.push(`/search/${this.state.searchItem}`)
                }
                disabled={!this.state.searchItem}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AmplifyComponent;
