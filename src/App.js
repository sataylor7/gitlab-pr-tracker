import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./App.css";

import Routes from "./routes";

// THIS FILE IS NOT EXPORTED IT IS ONLY USED FOR LOCAL DEVING

class App extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div id="app">
        <Routes isAuthenticated={isAuthenticated} />
      </div>
    );
  }
}

export const AppTest = App;

const mapState = ({ auth = {} }) => ({
  isAuthenticated: auth.isAuthenticated
});

const mD = {};

export default withRouter(connect(mapState, null)(App));
