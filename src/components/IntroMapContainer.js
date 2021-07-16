import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API_URL } from '../constants/defaults';
// import _ from 'lodash';
import styled from 'styled-components';
import { withRouter } from 'react-router';


const MapDiv = styled.div`
  width: 100%;
  height: 500px;
  border:1px solid #eee;
`;


class IntroMapContainer extends Component {
  componentDidMount() {
    window.mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    this.map = new window.mapboxgl.Map({
      container: this.refsMapContainer,
      style: 'mapbox://styles/dataplusfeminism/ckr2cp6e61rta17nz9n8b8bcf/draft',
      zoom: 4,
      minZoom: 4,
      maxZoom: 22,
      center: [ -95, 37],
      // interactive: false
    });


    window.map = this.map;
    this.map.on('style.load', this.handleStyleLoad.bind(this));
  
  }

  showCityLevelInformation(){


    this.map.addLayer({
      'id': 'columbus_streets_layer',
      source: 'columbus_streets',
      type: 'line',
      "source-layer": "public.columbus_streets",
      'layout': {},
      'paint': {
        'line-color': '#339cbe',
        'line-width': [
          'interpolate',
          ['linear'],
          ['zoom'],
          2,
          0.6,
          12,
          2,
          16,
          4,
          18,
          20
        ],
        'line-opacity': 1
      }
    }, "admin-0-boundary-disputed");


    this.map.addLayer({
      'id': 'verified_matches_layer_point',
      source: 'columbus_points',
      "source-layer": "public.columbus_points",
      'type': 'circle',
      'paint': {
        'circle-radius': {
          stops: [[2.8, 1.5], [11, 3], [16, 25]]
        },
        'circle-color': [
          'match',
          ['get', 'fclass'],
          'Building',
          '#ecec0a',
          'Infrastructure',
          '#7bca52',
          'Monument',
          '#cf5dcc',
          'Natural Feature',
          '#2559c8',
          'Park',
          '#9770de',
          'Place',
          '#d32f65',
          'School',
          '#4becee',
          /* other */ 'rgba(155, 155, 155, 0.1)'
          ]
      }
    }, "admin-0-boundary-disputed");

    this.map.addLayer({
      'id': 'columbus_name_layer',
      'type': 'symbol',
      'source': 'columbus_points',
      'source-layer': 'public.columbus_points',
      "layout": {
        "text-offset": [0, -1.5],
        "text-field": ['get', 'name'],
        "text-font": ["Spectral SemiBold"],
        "text-allow-overlap": false,
        "text-size": [
          'interpolate',
          ['linear'],
          ['zoom'],
          16,
          14,
          22,
          20
        ],
      },
      'paint': {
        'text-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          10,
          0,
          11,
          1
        ],
        'text-halo-color': '#352e2c',
        'text-halo-width': 2,
        'text-color': [
          'match',
          ['get', 'fclass'],
          'Building',
          '#ecec0a',
          'Infrastructure',
          '#7bca52',
          'Monument',
          '#cf5dcc',
          'Natural Feature',
          '#2559c8',
          'Park',
          '#9770de',
          'Place',
          '#d32f65',
          'School',
          '#4becee',
          'Street',
          '#339cbe',
          /* other */ 'rgba(155, 155, 155, 0.1)'
          ]
      }
    }, "admin-0-boundary-disputed");

  }
  async handleStyleLoad() {

    this.map.addSource('columbus_points', {
      "type": 'vector',
      "tiles": [`${API_URL}/tiles/columbus_points/{z}/{x}/{y}.pbf`],
      "minZoom": 2.8,
      "maxZoom": 22
    });

    this.map.addSource('columbus_streets', {
      "type": 'vector',
      "tiles": [`${API_URL}/tiles/columbus_streets/{z}/{x}/{y}.pbf`],
      "minZoom": 2.8,
      "maxZoom": 22
    });

    this.showCityLevelInformation();




    // this.map.addLayer({
    //   'id': 'verified_matches_layer_point',
    //   source: 'columbus_points',
    //   "source-layer": "public.columbus_points",
    //   'type': 'circle',
    //   'paint': {
    //     'circle-radius': {
    //       stops: [[2.8, 1.5], [11, 3], [16, 25]]
    //     },
    //     'circle-color': '#339cbe'
    //   }
    // }, "admin-0-boundary-disputed");
    // this.map.addLayer({
    //   'id': 'columbus_name_layer',
    //   'type': 'symbol',
    //   'source': 'columbus_points',
    //   'source-layer': 'public.columbus_points',
    //   "layout": {
    //     "text-field": ['get', 'name'],
    //     "text-font": ["Spectral SemiBold"],
    //     "text-allow-overlap": true,
    //     "text-size": [
    //       'interpolate',
    //       ['linear'],
    //       ['zoom'],
    //       3,
    //       5,
    //       7,
    //       6,
    //       18,
    //       10,
    //       22,
    //       12
    //     ],
    //   },
    //   'paint': {
    //     'text-color': "rgba(255, 255, 255, 0.1)"
    //   }
    // }, "admin-0-boundary-disputed");

    // this.map.addLayer({
    //   'id': 'columbus_name_layer',
    //   'type': 'symbol',
    //   'source': 'columbus_points',
    //   'source-layer': 'public.columbus_points',
    //   "layout": {
    //     "text-field": ['get', 'name'],
    //     "text-font": ["Spectral SemiBold"],
    //     "text-size": [
    //       'interpolate',
    //       ['linear'],
    //       ['zoom'],
    //       3,
    //       9,
    //       7,
    //       15,
    //       18,
    //       22,
    //       22,
    //       25
    //     ],
    //   },
    //   'paint': {
    //     'text-color': "rgba(255, 255, 255, 0.8)",
    //     "text-halo-color": "#453633",
    //     "text-halo-width": 2
    //   }
    // }, "admin-0-boundary-disputed");
  }

  

  render() {
    return (
      <MapDiv ref={c => { this.refsMapContainer = c; }} style={{height: this.props.windowHeight}}>
      </MapDiv>
    );
  }
}

let mapStateToProps = state => {

  return {
    windowWidth: state.windowWidth,
    windowHeight: state.windowHeight
  }
}

export default withRouter(connect(mapStateToProps)(IntroMapContainer));