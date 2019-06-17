import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const Search = () => {
  // eslint-disable-next-line
  const [text, setText] = useState("");

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
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default Search;
