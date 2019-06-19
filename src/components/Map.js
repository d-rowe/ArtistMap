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
    this.map = null;
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
      style: "mapbox://styles/mapbox/light-v9",
      center: [longitude, latitude],
      zoom
    });
    this.artistId = this.props.artistId;
    this.getConcerts(this.artistId);
  }

  addPoints = map => {
    const geojson = {
      id: "venues",
      type: "FeatureCollection",
      features: this.state.concerts.map(concert => {
        return {
          type: "Feature",
          properties: {
            venue: concert.displayName,
            date: concert.date.toLocaleDateString(),
            city: concert.city
          },
          geometry: {
            type: "Point",
            coordinates: [concert.lng, concert.lat]
          }
        };
      })
    };

    geojson.features.forEach(function(marker) {
      // create a HTML element for each feature
      var el = document.createElement("div");
      el.className = "marker";
      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<p>
              ${marker.properties.date}
              </p>
              <p> 
              ${marker.properties.venue}
              </p>
              <p> 
              ${marker.properties.city}
              </p>`
            )
        )
        .addTo(map);
    });
  };

  componentWillUnmount() {
    this.map.remove();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // Remove previous artist's pins before adding new ones
      let markers = document.getElementsByClassName("marker");
      while (markers.length > 0) {
        markers[0].remove();
      }
      // Begin fetching new data and pins
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
          this.addPoints(this.map);
          this.setState({ markersOnMap: true });
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
