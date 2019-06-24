export const addClusters = (map, concertsArray) => {
  // Create geojson from concertsArray
  const geojson = {
    id: "venues",
    type: "FeatureCollection",
    features: concertsArray.map(concert => {
      return {
        type: "Feature",
        properties: {
          name: concert.displayName,
          venue: concert.venue.displayName,
          date: concert.start.date,
          city: concert.location.city,
          url: concert.uri
        },
        geometry: {
          type: "Point",
          coordinates: [concert.venue.lng, concert.venue.lat]
        }
      };
    })
  };

  // Remove layers and source before adding new ones
  if (map.getLayer("clusters")) {
    map.removeLayer("clusters");
  }
  if (map.getLayer("cluster-count")) {
    map.removeLayer("cluster-count");
  }
  if (map.getLayer("unclustered-point")) {
    map.removeLayer("unclustered-point");
  }
  if (map.getSource("concerts")) {
    map.removeSource("concerts");
  }

  map.addSource("concerts", {
    type: "geojson",
    data: geojson,
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
  });

  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "concerts",
    filter: ["has", "point_count"],
    paint: {
      // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      // with three steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 100
      //   * Yellow, 30px circles when point count is between 100 and 750
      //   * Pink, 40px circles when point count is greater than or equal to 750
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6",
        100,
        "#f1f075",
        750,
        "#f28cb1"
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40]
    }
  });

  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "concerts",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12
    }
  });

  map.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: "concerts",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#11b4da",
      "circle-radius": 4,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff"
    }
  });
};