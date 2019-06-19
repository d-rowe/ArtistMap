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
      layerAdded: false,
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

  addLayer = () => {
    const features = this.state.concerts.map(concert => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [concert.lng, concert.lat]
        },
        properties: {
          title: concert.displayName,
          icon: "circle"
        }
      };
    });

    this.map.addLayer({
      id: "venues",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: features
        }
      },
      layout: {
        "icon-image": "{icon}-15",
        "icon-allow-overlap": true,
        'text-allow-overlap': true,
        // "text-field": "{title}",
        // "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.6],
        "text-anchor": "top"
      }
    });
    this.setState({ layerAdded: true });
  };

  componentWillUnmount() {
    this.map.remove();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.state.layerAdded) {
        this.map.removeLayer("venues");
        this.map.removeSource("venues");
      }
      this.getConcerts(this.props.artistId);
    }
  }

  // TODO: Get all concerts, not just 50
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
          this.addLayer();
        });
    }
  };

  // TODO: if no venue lat/lng, use city lat/lng
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
