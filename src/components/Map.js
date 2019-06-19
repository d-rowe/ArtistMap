import React from "react";
import mapboxgl from "mapbox-gl";
import pick from "lodash.pick";
import { TOKEN, KEY } from "../token";
import { connect } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = TOKEN;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 42.877742,
      longitude: -97.380979,
      zoom: 3,
      concerts: []
    };
    this.setConcerts = this.props.setConcerts;
  }

  componentDidMount() {
    const { longitude, latitude, zoom } = this.state;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [longitude, latitude],
      zoom
    });

    this.artistId = this.props.artistId;
    this.getConcerts(this.artistId);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getConcerts(this.props.artistId);
    }
  }

  getConcerts = artistId => {
    if (artistId !== "") {
      fetch(
        `https://api.songkick.com/api/3.0/artists/${artistId}/gigography.json?apikey=${KEY}`
      )
        .then(response => response.json())
        .then(data => {
          const concertData = this.filterResults(data);
          this.setState({ concerts: concertData });
          this.setConcerts(concertData);
        });
    }
  };

  filterResults = results => {
    const events = results.resultsPage.results.event;
    let filteredResults = [];
    for (let id in events) {
      const event = events[id];
      const date = new Date(event.start.date);
      const venue = pick(event.venue, ["displayName", "id", "lat", "lng"]);
      const concertData = { ...venue, date };
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
