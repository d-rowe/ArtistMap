import React, { Component } from "react";
import ReactMapGL from "react-map-gl";
import TOKEN from "../token";
import "mapbox-gl/dist/mapbox-gl.css";

class Map extends Component {
  state = {
    viewport: {
      width: "100%",
      height: "100%",
      latitude: 47.608013,
      longitude: -122.335167,
      zoom: 9
    }
  };

  render() {
    return (
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxApiAccessToken={TOKEN}
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        onResize={size => console.log(size)}
      />
    );
  }
}

export default Map;
