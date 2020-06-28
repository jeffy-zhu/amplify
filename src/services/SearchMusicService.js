export const findMusic = (searchItem) =>
  fetch(
    `https://www.songsterr.com/a/ra/songs.json?pattern=${searchItem}`
  ).then((response) => response.json());

export default {
  findMusic,
};
