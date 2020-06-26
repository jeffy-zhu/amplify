import React from "react";
import MusicDetailsService from "../services/MusicDetailsService";
import { connect } from "react-redux";

class MusicDetailsComponent extends React.Component {
  artist = this.props.match.params.artistName;
  songTitle = decodeURIComponent(this.props.match.params.songTitle);

  componentDidMount() {
    const songTitle = this.songTitle.split("/").join("");
    this.props.findLyrics(this.artist, songTitle);
  }

  render() {
    let lyrics;
    if (
      this.props.songLyrics &&
      this.props.songLyrics.hasOwnProperty("lyrics")
    ) {
      lyrics = this.props.songLyrics.lyrics;
    } else {
      lyrics = "no lyrics :(";
    }
    return (
      <div>
        <h1>Music Details Component</h1>
        <div>{this.songTitle}</div>
        <div>{this.artist}</div>
        {lyrics}
      </div>
    );
  }
}

const stateToPropertyMapper = (state) => {
  return {
    songLyrics: state.musicDetails.lyrics,
  };
};

const dispatchToPropertyMapper = (dispatch) => {
  return {
    findLyrics: (artist, title) =>
      MusicDetailsService.findLyrics(artist, title).then((lyricsFromServer) =>
        dispatch({
          type: "FIND_LYRICS",
          lyrics: lyricsFromServer,
        })
      ),
  };
};

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(MusicDetailsComponent);
