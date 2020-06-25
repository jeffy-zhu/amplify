const musicDetailsReducer = (state = {}, action) => {
  if (action.type === "FIND_LYRICS") {
    return {
      lyrics: action.lyrics,
    };
  }
  return state;
};

export default musicDetailsReducer;
