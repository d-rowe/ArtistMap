const initState = {
  artist: {
    displayName: "",
    id: ""
  },
  concerts: []
};

const rootReducer = (state = initState, action) => {
  if (action.type === "SET_ARTIST") {
    return {
      ...state,
      artist: { displayName: action.name, id: action.id }
    };
  }

  if (action.type === "SET_CONCERTS") {
    return {
      ...state,
      concerts: action.concerts
    };
  }

  return state;
};

export default rootReducer;
