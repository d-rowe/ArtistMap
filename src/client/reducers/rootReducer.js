const initState = {
  artist: {
    displayName: '',
    id: ''
  },
  suggestions: [],
  concerts: [],
  loadingConcerts: false,
  loadingArtists: false
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_ARTIST': {
      return {
        ...state,
        artist: { displayName: action.name, id: action.id },
        loadingConcerts: true
      };
    }

    case 'SET_SUGGESTIONS': {
      return {
        ...state,
        suggestions: action.suggestions
      };
    }

    case 'SET_CONCERTS': {
      return {
        ...state,
        concerts: action.concerts,
        loadingConcerts: false
      };
    }

    case 'SET_LOADING_ARTISTS': {
      return {
        ...state,
        loadingArtists: action.loadingArtists
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
