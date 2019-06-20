import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import "./style.scss";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.setArtist = this.props.setArtist;
  }

  onEnter = () => {
    this.getArtists();
  };

  onKeyDown = keyVal => {
    if (keyVal === 13) {
      this.onEnter();
    }
  };

  getArtists = () => {
    if (this.state.text !== "" && this.state.text.length >= 2) {
      fetch(`/api/artist?artistName=${this.state.text}`)
        .then(response => response.json())
        .then(data => {
          try {
            if ((data.displayName !== undefined) && (data.id )) {
              this.setArtist(data.displayName, data.id);
              this.refs.searchinput.value = data.displayName;
            }
          } catch {
            // TODO: alert if no matches
          }
        });
    }
  };
  render() {
    return (
      <div className="input-group input-group-lg search shadow">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
        <input
          type="text"
          ref="searchinput"
          className="form-control search-input"
          placeholder="Artist"
          aria-label="Artist name"
          aria-describedby="basic-addon1"
          onChange={e => this.setState({ text: e.target.value })}
          onKeyDown={e => this.onKeyDown(e.keyCode)}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setArtist: (name, id) => {
      dispatch({ type: "SET_ARTIST", name: name, id: id });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Search);
