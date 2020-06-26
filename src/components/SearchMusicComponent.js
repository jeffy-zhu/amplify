import React from "react";
import { connect } from "react-redux";
import SearchMusicService from "../services/SearchMusicService";
import { Link } from "react-router-dom";

class SearchMusicComponent extends React.Component {
  componentDidMount() {
    const searchItem = this.props.match.params.searchItem;
    this.props.findMusic(searchItem);
  }

  render() {
    return (
      <div>
        <h1>Search Music Component</h1>
        <ul>
          {this.props.songs &&
            this.props.songs.map((song, i) => {
              return (
                <Link
                  to={`/artist/${song.artist.id}/${song.artist.name}/song/${
                    song.id
                  }/${encodeURIComponent(song.title)}`}
                  key={i}
                >
                  <li>
                    <div>{song.title}</div>
                    <div>{song.artist.name}</div>
                  </li>
                </Link>
              );
            })}
        </ul>
      </div>
    );
  }
}

const stateToPropertyMapper = (state) => {
  return {
    songs: state.searchMusic.songs,
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
