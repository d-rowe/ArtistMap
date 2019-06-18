import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { KEY } from "../token";
import "./style.scss";

const Search = () => {
  // eslint-disable-next-line
  const [text, setText] = useState("");
  const [artists, setArtists] = useState();

  const onChange = text => {
    setText(text);
    getArtists();
  };

  const getArtists = () => {
    if (text !== "" && text.length >= 2) {
      fetch(
        `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${text}&api_key=${KEY}&limit=5&format=json`
      )
        .then(response => response.json())
        .then(data => {
          if (data !== (undefined || {})) {
            try {
              setArtists(data["results"]["artistmatches"]["artist"]);
              // TODO: redux
              console.log(artists);
            } catch {}
          }
        });
    }
  };

  return (
    <div className="input-group input-group-lg search shadow">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
      <input
        type="text"
        className="form-control search-input"
        placeholder="Artist Name"
        aria-label="Artist Name"
        aria-describedby="basic-addon1"
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
