import React from "react";

class AmplifyComponent extends React.Component {
  state = {
    searchItem: "",
  };

  render() {
    return (
      <div>
        <h1>Welcome to Amplify!</h1>
        <input
          className="form-control"
          onChange={(e) => this.setState({ searchItem: e.target.value })}
        />
        <button
          onClick={() =>
            this.props.history.push(`/search/${this.state.searchItem}`)
          }
        >
          Submit
        </button>
      </div>
    );
  }
}

export default AmplifyComponent;
