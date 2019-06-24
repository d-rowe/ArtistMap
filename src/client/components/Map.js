import React from "react";
import mapboxgl from "mapbox-gl";
import pick from "lodash.pick";
import { addClusters } from "./MapTools";
import { TOKEN } from "../mapboxToken";
import { connect } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = TOKEN;

// TODO: Move getConcerts() and filterResults() to MapTools.js and migrate concert data from state to Redux

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
      latitude: 36.5,
      longitude: -95,
      zoom: 3.5,
      style: "mapbox://styles/mapbox/dark-v10",
      concerts: []
    };
    this.setConcerts = this.props.setConcerts;
  }

  componentDidMount() {
    const { longitude, latitude, zoom, style } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: style,
      center: [longitude, latitude],
      zoom
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  componentDidUpdate(prevProps) {
    // Check if artistId prop changed
    if (this.props.artistId !== prevProps.artistId) {
      // Begin fetching source and add layers
      this.getConcerts(this.props.artistId);
    }
  }

  getConcerts = artistId => {
    if (artistId !== "") {
      fetch(`api/concerts?artistId=${artistId}`)
        .then(response => response.json())
        .then(concerts => {
          this.setState({ concerts: concerts });
          // Send concert data to Redux
          this.setConcerts(concerts);
          // Add clusters to map
          addClusters(this.map, this.state.concerts);
        });
    }
  };

  // TODO: Move this to backend before response is sent
  // TODO: if no venue lat/lng, use city lat/lng
  filterResults = results => {
    const events = results.resultsPage.results.event;
    let filteredResults = [];
    for (let id in events) {
      const event = events[id];
      const date = new Date(event.start.date);
      const venue = pick(event.venue, ["displayName", "id", "lat", "lng"]);
      const city = event.location.city;
      const url = event.uri;
      const concertData = { ...venue, date, city, url };
      filteredResults.push(concertData);
    }
    return filteredResults;
  };

  render() {
    return <div className="map" ref={el => (this.mapContainer = el)} />;
  }
}

const mapStateToProps = state => {
  return {
    artistId: state.artist.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setConcerts: concertArray => {
      dispatch({ type: "SET_CONCERTS", concerts: concertArray });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
