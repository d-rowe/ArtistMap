import React from "react";
import { connect } from "react-redux";
import "./style.scss";
import Suggestions from "./Suggestions";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.text = "";
    this.canCall = true;
    this.apiRateLimit = 750; // in ms
    this.setArtist = this.props.setArtist;
    this.setSuggestions = this.props.setSuggestions;
    this.lastSearch = "";
  }

  onEnter = () => {
    const artist = this.props.suggestions[0];
    this.setArtist(artist.name, artist.id);
    this.setSuggestions([]);
  };

  onFocus = e => {
    this.onChange(e);
  };

  onBlur = () => {
    // Wait for artist to be set and then clear suggestions
    setTimeout(() => {
      this.setSuggestions([]);
    }, 100);
  };

  onChange = e => {
    const text = e.target.value;
    this.text = text;

    if (this.canCall && text.length > 2) {
      this.getSuggestions();
      this.canCall = false;
      setTimeout(() => {
        this.canCall = true;
        if (this.text !== this.lastSearch) {
          this.getSuggestions();
        }
      }, this.apiRateLimit);
    }
  };

  onKeyDown = e => {
    // Set artist with enter key
    const keyVal = e.keyCode;
    if (keyVal === 13) {
      this.onEnter();
    }
    // Clear suggestions with esc key
    if (keyVal === 27) {
      this.setSuggestions([]);
    }
  };

  getSuggestions = () => {
    this.lastSearch = this.text;
    if (this.text !== "" && this.text.length >= 2) {
      fetch(`/api/artist?artistName=${this.text}`)
        .then(response => response.json())
        .then(data => {
          this.setSuggestions(data);
        });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.artist !== this.props.artist) {
      this.refs.searchinput.value = this.props.artist.displayName;
    }
  }

  render() {
    return (
      <div className="search">
        <div className="input-group input-group-lg shadow">
          <input
            type="text"
            ref="searchinput"
            className="form-control search-input"
            placeholder="Artist"
            aria-label="Artist name"
            aria-describedby="basic-addon1"
            onChange={this.onChange}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onKeyDown={this.onKeyDown}
          />
        </div>
        <Suggestions />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    artist: state.artist,
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
)(Search);
