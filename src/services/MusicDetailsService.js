export const getLyrics = async (artist, title) => {
  const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
  const lyrics = await response.json();

  return lyrics;
};

export const getTrackInfo = async (artist, title) => {
  const API_KEY = process.env.REACT_APP_LASTFM_API_KEY;
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${artist}&track=${title}&format=json`
  );
  const trackInfo = await response.json();

  return trackInfo;
};

export default {
  getLyrics,
  getTrackInfo,
};
