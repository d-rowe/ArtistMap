import React from "react";
import pick from "lodash.pick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { KEY } from "../token";
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

  filterResults = results => {
    let artists = results["resultsPage"]["results"]["artist"];
    let filteredResults = [];
    for (let id in artists) {
      let artist = artists[id];
      filteredResults.push(pick(artist, ["id", "displayName"]));
    }
    return filteredResults;
  };

  getArtists = () => {
    if (this.state.text !== "" && this.state.text.length >= 2) {
      fetch(
        `https://api.songkick.com/api/3.0/search/artists.json?apikey=${KEY}&query=${
          this.state.text
        }&per_page=5`
      )
        .then(response => response.json())
        .then(data => {
          try {
            let artist = this.filterResults(data)[0];
            if (artist.displayName !== undefined) {
              this.setArtist(artist.displayName, artist.id);
              this.refs.searchinput.value = artist.displayName;
            }
          } catch {
            // TODO: altert if no matches
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
          placeholder="Artist Name"
          aria-label="Artist Name"
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
