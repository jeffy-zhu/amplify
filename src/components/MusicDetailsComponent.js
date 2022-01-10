import React, { useEffect, useState } from "react";
import MusicDetailsService from "../services/MusicDetailsService";
import { useDispatch, useSelector } from "react-redux";
import "../styles/MusicDetails.css";
import { useParams } from "react-router-dom";

const MusicDetailsComponent = () => {
  const [tabInfo, setTabInfo] = useState("");
  const [aboutTabClicked, setAboutTabClicked] = useState(true);
  const [descriptionTabClicked, setDescriptionTabClicked] = useState(false);
  const [lyricsTabClicked, setLyricsTabClicked] = useState(false);
  const lyrics = useSelector((state) => state.musicDetails.lyrics);
  const trackInfo = useSelector((state) => state.musicDetails.trackInfo);
  const artist = useParams().artistName;
  const songId = useParams().songId;
  const songTitle = decodeURIComponent(useParams().songTitle);
  const dispatch = useDispatch();

  useEffect(() => {
    const getLyrics = async (artist, title) => {
      const lyrics = await MusicDetailsService.getLyrics(artist, title);

      dispatch({ type: "GET_LYRICS", lyrics: lyrics });
    };
    const getTrackInfo = async (artist, title) => {
      const trackInfo = await MusicDetailsService.getTrackInfo(artist, title);

      dispatch({ type: "GET_TRACK_INFO", trackInfo: trackInfo });
    };

    getTrackInfo(artist, songTitle);
    getLyrics(artist, songTitle);
  }, []);

  return (
    <div className="row">
      <div className="col-6">
        {trackInfo &&
        trackInfo.track &&
        trackInfo.track.album &&
        trackInfo.track.album.image ? (
          <img
            id="cover-art"
            src={trackInfo.track.album.image[3]["#text"]}
            alt={"Cover art for " + songTitle}
          />
        ) : (
          <div id="no-cover-art-border">
            <p id="no-cover-art-text">No cover art available</p>
          </div>
        )}
      </div>
      <div className="col-3">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`http://www.songsterr.com/a/wa/song?id=${songId}`}
        >
          <button id="tabs-button" className="btn btn-success">
            <i className="fas fa-guitar"></i> Tabs
          </button>
        </a>
        <div className="card">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button
                  className={aboutTabClicked ? "nav-link active" : "nav-link"}
                  onClick={() => {
                    setAboutTabClicked(true);
                    setDescriptionTabClicked(false);
                    setLyricsTabClicked(false);
                  }}
                >
                  About
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={
                    descriptionTabClicked ? "nav-link active" : "nav-link"
                  }
                  onClick={() => {
                    if (trackInfo && trackInfo.track && trackInfo.track.wiki) {
                      setTabInfo(trackInfo.track.wiki.summary);
                    } else {
                      setTabInfo("Description unavailable");
                    }
                    setAboutTabClicked(false);
                    setDescriptionTabClicked(true);
                    setLyricsTabClicked(false);
                  }}
                >
                  Description
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={lyricsTabClicked ? "nav-link active" : "nav-link"}
                  onClick={() => {
                    if (lyrics && lyrics.lyrics) setTabInfo(lyrics.lyrics);
                    else setTabInfo("Lyrics unavailable");

                    setAboutTabClicked(false);
                    setDescriptionTabClicked(false);
                    setLyricsTabClicked(true);
                  }}
                >
                  Lyrics
                </button>
              </li>
            </ul>
          </div>
          <div className="card-body overflow-auto">
            {aboutTabClicked && (
              <div>
                <div>
                  <span className="bolded">Song:</span> {songTitle}
                </div>
                <div>
                  <span className="bolded">Artist:</span> {artist}
                </div>
                <div>
                  <span className="bolded">Album:</span>{" "}
                  {trackInfo &&
                  trackInfo.track &&
                  trackInfo.track.album &&
                  trackInfo.track.album.title
                    ? trackInfo.track.album.title
                    : "N/A"}
                </div>
              </div>
            )}
            {!aboutTabClicked && tabInfo}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicDetailsComponent;
