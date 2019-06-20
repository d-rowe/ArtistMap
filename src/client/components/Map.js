import React from "react";
import mapboxgl from "mapbox-gl";
import pick from "lodash.pick";
import { TOKEN } from "../mapboxToken";
import { connect } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = TOKEN;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
      latitude: 36.5,
      longitude: -95,
      zoom: 3.5,
      style: "mapbox://styles/danielrowe/cjx57ugrn2nhu1dofkutvayfe",
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

  addMarkers = map => {
    const geojson = {
      id: "venues",
      type: "FeatureCollection",
      features: this.state.concerts.map(concert => {
        return {
          type: "Feature",
          properties: {
            venue: concert.venue.displayName,
            date: concert.start.date,
            city: concert.location.city
          },
          geometry: {
            type: "Point",
            coordinates: [concert.venue.lng, concert.venue.lat]
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
    // Check if artistId prop changed
    if (this.props.artistId !== prevProps.artistId) {
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
      fetch(`api/concerts?artistId=${artistId}`)
        .then(response => response.json())
        .then(concerts => {
          this.setState({ concerts: concerts });
          // Send concert data to Redux
          this.setConcerts(concerts);
          // Add markers to map
          this.addMarkers(this.map);
          // Let state know that we currently have markers on the map
          this.setState({ markersOnMap: true });
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
