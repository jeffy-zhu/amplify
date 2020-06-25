export const findLyrics = (artist, title) =>
  fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`).then((response) =>
    response.json()
  );

export default {
  findLyrics,
};
