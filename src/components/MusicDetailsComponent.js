import React from "react";
import MusicDetailsService from "../services/MusicDetailsService";
import { connect } from "react-redux";

class MusicDetailsComponent extends React.Component {
  componentDidMount() {
    const artist = this.props.match.params.artistName;
    const title = this.props.match.params.songTitle;
    this.props.findLyrics(artist, title);
  }

  render() {
    return (
      <div>
        <h1>Music Details Component</h1>
        <div>{this.props.match.params.songTitle}</div>
        <div>{this.props.match.params.artistName}</div>
        {this.props.songLyrics && this.props.songLyrics.lyrics}
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
