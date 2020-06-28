const musicDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case "FIND_TRACK_INFO":
      return {
        lyrics: action.lyrics,
        trackInfo: action.trackInfo,
      };
    default:
      return state;
  }
};

export default musicDetailsReducer;
