const musicDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_LYRICS':
      return {
        ...state,
        lyrics: action.lyrics,
      }
    case 'GET_TRACK_INFO':
      return {
        ...state,
        trackInfo: action.trackInfo,
      }
    default:
      return state;
  }
};

export default musicDetailsReducer;
