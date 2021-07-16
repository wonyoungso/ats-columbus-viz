import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/Home';


class App extends Component {

  render() {

    return (
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
      
    );
  }
}

let mapStateToProps = state => {
  return {
    width: state.windowWidth,
    height: state.windowHeight,
    mapLoaded: state.mapLoaded
  }
};

export default connect(mapStateToProps)(App);