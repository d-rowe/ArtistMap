import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import TOKEN from "../token";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 42.877742,
    longitude: -97.380979,
    zoom: 3
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/light-v9"
      mapboxApiAccessToken={TOKEN}
      {...viewport}
      onViewportChange={viewport => setViewport(viewport)}
      onResize={size => console.log(size)}
    />
  );
};

export default Map;
