import React from "react";
import { connect } from "react-redux";
import SearchMusicService from "../services/SearchMusicService";

class SearchMusicComponent extends React.Component {
  componentDidMount() {
    this.props.findMusic("rihanna");
  }

  render() {
    return (
      <div>
        <h1>Search Music Component</h1>
        <ul>
          {this.props.songs &&
            this.props.songs.map((song) => {
              return <li>{song.title}</li>;
            })}
        </ul>
      </div>
    );
  }
}

const stateToPropertyMapper = (state) => {
  return {
    songs: state.songs,
  };
};

const dispatchToPropertyMapper = (dispatch) => {
  return {
    findMusic: (searchItem) =>
      SearchMusicService.findMusic(searchItem).then((songsFromServer) =>
        dispatch({
          type: "FIND_MUSIC",
          songs: songsFromServer,
        })
      ),
  };
};

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(SearchMusicComponent);
