import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

/**
 * @description renders the component only if the user is authenticated otherwise it is redirected to login
 */
const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: rest.redirect || "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(AuthenticatedRoute);
