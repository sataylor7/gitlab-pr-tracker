import React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import AuthenticatedRoute from "./../utils/redux/authenticated.route";

import routes from "./config/lazyload";

/**
 * @description generating the routes based on the lazyloaded array
 */
const generatingRoutes = (isAuthenticated, route) => {
  // the tag will be either the AuthenticatedRoute or a regular Route
  const Tag = route.authenticate ? AuthenticatedRoute : Route;

  return (
    <Tag
      {...(route.path
        ? { exact: true, path: route.route, isAuthenticated }
        : {})}
      component={route.lazy ? Loadable(route.moduleName) : route.moduleName}
      key={route.name}
    />
  );
};
/**
 * @description mapping through the array and passing the `isAuthenticated` attribute
 */
const mappingRoutes = isAuthenticated =>
  routes.map(route => generatingRoutes(isAuthenticated, route));

export default ({ isAuthenticated, ...rest }) => (
  <Switch>{mappingRoutes(isAuthenticated)}</Switch>
);
