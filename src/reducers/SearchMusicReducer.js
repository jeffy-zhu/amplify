const searchMusicReducer = (state = {}, action) => {
  if (action.type === "FIND_MUSIC") {
    return {
      songs: action.songs,
    };
  }
  return state;
};

export default searchMusicReducer;
