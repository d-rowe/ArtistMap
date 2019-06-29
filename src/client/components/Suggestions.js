import React, { useState } from "react";
import { connect } from "react-redux";

const Suggestions = ({ setArtist, suggestions, setSuggestions }) => {
  if (suggestions.length > 0) {
    return (
      <div className="suggestions">
        <ul className="list-group">
          {suggestions.map(suggestion => (
            <Suggestion
              name={suggestion.name}
              id={suggestion.id}
              setArtist={setArtist}
              setSuggestions={setSuggestions}
            />
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

const Suggestion = ({ name, id, setArtist, setSuggestions }) => {
  const [active, setActive] = useState(false);

  const onClick = e => {
    setArtist(name, id);
    setSuggestions([]);
  };

  const onHover = () => {
    setActive(true);
  };

  const onLeave = () => {
    setActive(false);
  };

  return (
    <li
      className={"list-group-item suggestion " + (active ? " active" : "")}
      id={id}
      key={id}
      onClick={onClick}
      onMouseOver={onHover}
      onMouseLeave={onLeave}
    >
      {name}
    </li>
  );
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
