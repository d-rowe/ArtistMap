import React from 'react';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_TOKEN } from '../config';
import { connect } from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = MAPBOX_TOKEN;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
      latitude: 36.5,
      longitude: -95,
      zoom: 3.5,
      style: 'mapbox://styles/mapbox/dark-v10',
      concerts: []
    };
    this.setGeoJSON = this.props.setGeoJSON;
  }

  componentDidMount() {
    const { longitude, latitude, zoom, style } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: style,
      center: [longitude, latitude],
      zoom
    });

    this.setMouseEvents();
  }

  componentWillUnmount() {
    this.map.remove();
  }

  componentDidUpdate(prevProps) {
    // Check if artistId prop changed
    if (this.props.artistId !== prevProps.artistId) {
      // Begin fetching source and add layers
      this.getGeoJOSN(this.props.artistId);
    }
  }

  getGeoJOSN = artistId => {
    if (artistId !== '') {
      fetch(`api/concerts?artistId=${artistId}`)
        .then(response => response.json())
        .then(geoJSON => {
          this.setState({ geoJSON: geoJSON });
          this.setGeoJSON(geoJSON); // Send concert data to Redux
          this.addClusters(); // Add clusters to map
        });
    }
  };

  addClusters = () => {
    const map = this.map;
    // Remove layers and source before adding new ones
    this.removeClusters();

    map.addSource('concerts', {
      type: 'geojson',
      data: this.state.geoJSON,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'concerts',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#62a1db', // Blue circle when less than 10 concerts
          10,
          '#e7d87d', // Yellow circle when between 10 and 25 concerts
          25,
          '#dd9f40', // Orange circle when between 25 and 50 concerts
          50,
          '#b4451f', // Orangered circle when between 50 and 100 concerts
          100,
          '#b01111' // Red circle when more than 100 concerts
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          15, // 15px circle when less than 10 concerts
          10,
          20, // 20px circle when between 10 and 25 concerts
          25,
          25, // 25px circle when between 25 and 50 concerts
          50,
          30, // 30px circle when between 50 and 100 concerts
          100,
          40 // 40px circle when more than 100 concerts
        ]
      }
    });

    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'concerts',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
    });

    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'concerts',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#11b4da',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
      }
    });
  };

  removeClusters = () => {
    const map = this.map;

    const layers = ['clusters', 'cluster-count', 'unclustered-point'];
    layers.forEach(layer => {
      if (map.getLayer(layer)) {
        map.removeLayer(layer);
      }
    });

    if (map.getSource('concerts')) {
      map.removeSource('concerts');
    }
  };

  setMouseEvents = () => {
    const map = this.map;
    // inspect a cluster on click
    map.on('click', 'clusters', function(e) {
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters']
      });
      var clusterId = features[0].properties.cluster_id;
      map
        .getSource('concerts')
        .getClusterExpansionZoom(clusterId, function(err, zoom) {
          if (err) return;

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
          });
        });
    });

    map.on('mouseenter', 'clusters', function() {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function() {
      map.getCanvas().style.cursor = '';
    });
  };

  render() {
    return <div className='map' ref={el => (this.mapContainer = el)} />;
  }
}

const mapStateToProps = state => {
  return {
    artistId: state.artist.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGeoJSON: concertArray => {
      dispatch({ type: 'SET_CONCERTS', concerts: concertArray });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
