export const findTrackInfo = (artist, title) =>
  Promise.all([
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`).then((response) =>
      response.json()
    ),
    fetch(
      `https://theaudiodb.com/api/v1/json/1/searchtrack.php?s=${artist}&t=${title}`
    ).then((response) => response.json()),
  ]);

export default {
  findTrackInfo,
};
