/**
 * @description setting up the routes as an array to build the route components in the index file
 * DO NOT RENAME THIS VARIABLE - as `treasure-map feature <name>` looks for this variable name to inject
 * the newly generated feature
 */
const routes = [
  {
    name: "Dashboard",
    moduleName: {
      loader: () => import(/* webpackChunkName: "dashboard" */ "../dashboard"),
      loading: () => null,
      modules: ["dashboard"]
    },
    lazy: true,
    path: true,
    authenticate: false,
    route: "/"
  }
];
export default routes;
