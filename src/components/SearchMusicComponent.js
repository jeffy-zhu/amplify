import React from "react";
import { connect } from "react-redux";
import SearchMusicService from "../services/SearchMusicService";
import { Link } from "react-router-dom";
import "../styles/SearchMusic.css";

class SearchMusicComponent extends React.Component {
  searchItem = this.props.match.params.searchItem;

  componentDidMount() {
    this.props.findMusic(this.searchItem);
  }

  render() {
    let numResults;
    if (this.props.songs) {
      numResults = this.props.songs.length;
    }
    return (
      <div className="row mb-3">
        <div className="col-6 offset-3">
          <h1>Searching: {this.searchItem}</h1>
          <div id="num-results">There are {numResults} search results.</div>
          <ul className="list-group">
            {this.props.songs &&
              this.props.songs.map((song, i) => {
                return (
                  <Link
                    className="list-group-item list-group-item-action"
                    to={`/artist/${song.artist.id}/${song.artist.name}/song/${
                      song.id
                    }/${encodeURIComponent(song.title)}`}
                    key={i}
                  >
                    <div>
                      <span className="bolded">Title:</span> {song.title}
                    </div>
                    <div>
                      <span className="bolded">Artist:</span> {song.artist.name}
                    </div>
                  </Link>
                );
              })}
          </ul>
        </div>
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
