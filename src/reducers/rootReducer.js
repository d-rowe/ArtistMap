const initState = {
  artist: {
    displayName: "",
    id: ""
  }
};

const rootReducer = (state = initState, action) => {
  if (action.type === "SET_ARTIST") {
    return {
      ...state,
      artist: { displayName: action.name, id: action.id }
    };
  }

  return state;
};

export default rootReducer;
