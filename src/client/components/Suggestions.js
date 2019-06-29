import React from "react";
import { connect } from "react-redux";

const Suggestions = ({ setArtist, suggestions, setSuggestions }) => {
  const onClick = e => {
    const [name, id] = [e.target.textContent, e.target.id];
    setArtist(name, id);
    setSuggestions([]);
  };

  if (suggestions.length > 0) {
    return (
      <div className="suggestions">
        <ul className="list-group">
          {suggestions.map(suggestion => (
            <li
              className="list-group-item suggestion"
              id={suggestion.id}
              key={suggestion.id}
              onClick={onClick}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = state => {
  return {
    suggestions: state.suggestions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setArtist: (name, id) => {
      dispatch({ type: "SET_ARTIST", name: name, id: id });
    },
    setSuggestions: suggestions => {
      dispatch({ type: "SET_SUGGESTIONS", suggestions: suggestions });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Suggestions);
