import React from "react";
import MusicDetailsService from "../services/MusicDetailsService";
import { connect } from "react-redux";

class MusicDetailsComponent extends React.Component {
  artist = this.props.match.params.artistName;
  songTitle = decodeURIComponent(this.props.match.params.songTitle);

  componentDidMount() {
    const songTitle = this.songTitle.split("/").join("");
    this.props.findTrackInfo(this.artist, songTitle);
  }

  render() {
    let lyrics;
    let trackAlbum;
    let trackGenre;
    if (
      this.props.songLyrics &&
      this.props.songLyrics.hasOwnProperty("lyrics")
    ) {
      lyrics = this.props.songLyrics.lyrics;
    } else {
      lyrics = "no lyrics :(";
    }
    if (this.props.trackInfo && this.props.trackInfo.track !== null) {
      let trackInfoObject = {
        album: this.props.trackInfo.track[0].strAlbum,
        genre: this.props.trackInfo.track[0].strGenre,
      };
      for (const property in trackInfoObject) {
        if (trackInfoObject[property] === null) {
          trackInfoObject[property] = "no " + property + " :(";
        }
      }
      trackAlbum = trackInfoObject.album;
      trackGenre = trackInfoObject.genre;
    } else {
      trackAlbum = "no album :(";
      trackGenre = "no genre :(";
    }
    return (
      <div>
        <h1>Music Details Component</h1>
        <div>{this.songTitle}</div>
        <div>{trackAlbum}</div>
        <div>{this.artist}</div>
        <div>{trackGenre}</div>
        {lyrics}
      </div>
    );
  }
}

const stateToPropertyMapper = (state) => {
  return {
    songLyrics: state.musicDetails.lyrics,
    trackInfo: state.musicDetails.trackInfo,
  };
};

const dispatchToPropertyMapper = (dispatch) => {
  return {
    findTrackInfo: (artist, title) =>
      MusicDetailsService.findTrackInfo(artist, title).then(
        ([lyricsFromServer, trackInfoFromServer]) =>
          dispatch({
            type: "FIND_TRACK_INFO",
            lyrics: lyricsFromServer,
            trackInfo: trackInfoFromServer,
          })
      ),
  };
};

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(MusicDetailsComponent);
