import React from "react";
import MusicDetailsService from "../services/MusicDetailsService";
import { connect } from "react-redux";
import "../styles/MusicDetails.css";
import { Link } from "react-router-dom";

class MusicDetailsComponent extends React.Component {
  state = {
    tabInfo: "",
    aboutTabClicked: true,
    descriptionTabClicked: false,
    lyricsTabClicked: false,
  };
  artist = this.props.match.params.artistName;
  songId = this.props.match.params.songId;
  songTitle = decodeURIComponent(this.props.match.params.songTitle);

  componentDidMount() {
    const songTitle = this.songTitle.split("/").join("");
    this.props.findTrackInfo(this.artist, songTitle);
  }

  render() {
    let lyrics;
    let trackAlbum;
    let trackGenre;
    let trackDescription;
    let trackCoverArt;
    if (
      this.props.songLyrics &&
      this.props.songLyrics.hasOwnProperty("lyrics")
    ) {
      lyrics = this.props.songLyrics.lyrics;
    } else {
      lyrics = "no lyrics available :(";
    }
    if (this.props.trackInfo && this.props.trackInfo.track !== null) {
      let trackInfoObject = {
        album: this.props.trackInfo.track[0].strAlbum,
        genre: this.props.trackInfo.track[0].strGenre,
        description: this.props.trackInfo.track[0].strDescriptionEN,
        coverArt: this.props.trackInfo.track[0].strTrackThumb,
      };
      for (const property in trackInfoObject) {
        if (
          trackInfoObject[property] === null ||
          trackInfoObject[property] === "" ||
          trackInfoObject[property] === "..."
        ) {
          if (property === "coverArt") {
            trackInfoObject[property] = "no cover art available :(";
          } else {
            trackInfoObject[property] = "no " + property + " available :(";
          }
        }
      }
      trackAlbum = trackInfoObject.album;
      trackGenre = trackInfoObject.genre;
      trackDescription = trackInfoObject.description;
      trackCoverArt = trackInfoObject.coverArt;
    } else {
      trackAlbum = "no album available :(";
      trackGenre = "no genre available :(";
      trackDescription = "no description available :(";
      trackCoverArt = "no cover art available :(";
    }
    return (
      <div className="row">
        <div className="col-6">
          {trackCoverArt === "no cover art available :(" ? (
            <div id="no-cover-art-border">
              <p id="no-cover-art-text">{trackCoverArt}</p>
            </div>
          ) : (
            <img
              id="cover-art"
              src={trackCoverArt}
              alt={"Cover art for " + this.songTitle}
            />
          )}
        </div>
        <div className="col-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`http://www.songsterr.com/a/wa/song?id=${this.songId}`}
          >
            <button id="tabs-button" className="btn btn-success">
              <i className="fas fa-guitar"></i> Tabs
            </button>
          </a>
          <div className="card">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <Link
                    className={
                      this.state.aboutTabClicked
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={this.props.location.pathname}
                    onClick={() =>
                      this.setState({
                        aboutTabClicked: true,
                        descriptionTabClicked: false,
                        lyricsTabClicked: false,
                      })
                    }
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      this.state.descriptionTabClicked
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={this.props.location.pathname}
                    onClick={() =>
                      this.setState({
                        tabInfo: trackDescription,
                        aboutTabClicked: false,
                        descriptionTabClicked: true,
                        lyricsTabClicked: false,
                      })
                    }
                  >
                    Description
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      this.state.lyricsTabClicked
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={this.props.location.pathname}
                    onClick={() =>
                      this.setState({
                        tabInfo: lyrics,
                        aboutTabClicked: false,
                        descriptionTabClicked: false,
                        lyricsTabClicked: true,
                      })
                    }
                  >
                    Lyrics
                  </Link>
                </li>
              </ul>
            </div>
            <div className="card-body overflow-auto">
              {this.state.aboutTabClicked && (
                <div>
                  <div>
                    <span className="bolded">Song:</span> {this.songTitle}
                  </div>
                  <div>
                    <span className="bolded">Artist:</span> {this.artist}
                  </div>
                  <div>
                    <span className="bolded">Genre:</span> {trackGenre}
                  </div>
                  <div>
                    <span className="bolded">Album:</span> {trackAlbum}
                  </div>
                </div>
              )}
              {!this.state.aboutTabClicked && this.state.tabInfo}
            </div>
          </div>
        </div>
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
