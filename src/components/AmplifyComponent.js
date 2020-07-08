import React from "react";
import "../styles/Amplify.css";
import guitar from "../images/guitar.png";

class AmplifyComponent extends React.Component {
  state = {
    searchItem: "",
  };

  render() {
    return (
      <div id="centered">
        <img id="guitar" src={guitar} />
        <h1>Welcome to Amplify!</h1>
        <div id="instructions">Enter the name of an artist or song</div>
        <input
          onChange={(e) => this.setState({ searchItem: e.target.value })}
        />
        <button
          onClick={() =>
            this.props.history.push(`/search/${this.state.searchItem}`)
          }
          disabled={!this.state.searchItem}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default AmplifyComponent;
