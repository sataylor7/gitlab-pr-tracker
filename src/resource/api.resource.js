import axios from "axios";
import _get from "lodash/get";

const defaultHost = process.env.APP_PORT || 3000;
/* eslint-disable */
function APIResource({ headers = {}, hmk_env = "dev" }) {
  this.HEADERS = headers;
  this.HMK_ENV = hmk_env;

  /**
   * @description getHeaders - a simple way to return the headers that were set when the resource was initialized
   */
  const getHeaders = () => this.HEADERS;

  /**
   * @description setter for the HMK_ENV property - this is needed if proxies are going to be used
   * @param {string} environment - this will be the environment to look up the proxy configs for
   */
  const setHMKEnv = environment => {
    this.HMK_ENV = environment;
    return true;
  };

  /**
   * @private
   * @description wrapper around axios main request library
   * @param {string} url - url to look up/hit
   * @param {string} method - POST/PUT/GET/DELETE
   * @param {object} headers - headers for the request
   * @param {*} body - information to pass along with the request
   */
  /* eslint-disable class-methods-use-this */
  const _request = (url, method, headers, body) => {
    const options = {
      url,
      method,
      headers,
      data: body
    };
    return axios(options)
      .then(response => Promise.resolve(response.data))
      .catch(error => {
        console.log(`Error when making an http request to url: ${url}`, error);
        return Promise.reject(error);
      });
  };

  /**
   * GET Wrapper for our 3rd part http request resource - this way the feature using the resources
   * just has to do APIClientResource.fetch (it isnt called "get" as that is a reserved word)
   * @param  {string} url  the url/endpoint you are trying to hit
   * @param  {object} headers *optional, if headers are passed they will over ride the existing headers
   * @return {promise}      return a promise so that the feature can chain to it
   */
  const fetch = ({ url, headers }) => {
    const newHeaders = headers || this.HEADERS;
    return _request(url, "GET", newHeaders);
  };

  /**
   * POST Wrapper for our 3rd part http request resource - this way the feature using the resources
   * just has to do APIClientResource.post
   * @param  {string} url  the url/endpoint you are trying to hit
   * @param  {[type]} body the body of the request that you want to send to have created
   * @param  {object} headers *optional, if headers are passed they will over ride the existing headers
   * @return {promise}      return a promise so that the feature can chain to it
   */
  const post = ({ url, body, headers }) => {
    const newHeaders = headers || this.HEADERS;
    return _request(url, "POST", newHeaders, body);
  };

  /**
   * PUT Wrapper for our 3rd part http request resource - this way the feature using the resources
   * just has to do APIClientResource.post
   * @param  {string} url  the url/endpoint you are trying to hit
   * @param  {[type]} body the body of the request that you want to send to have created
   * @param  {object} headers *optional, if headers are passed they will over ride the existing headers
   * @return {promise}      return a promise so that the feature can chain to it
   */
  const put = ({ url, body = null, headers }) => {
    const newHeaders = headers || this.HEADERS;
    return _request(url, "PUT", newHeaders, body);
  };

  /**
   * OPTIONS Wrapper for our 3rd part http request resource - this way the feature using the resources
   * just has to do APIClientResource.options -> this can be used for PUT/PATCH
   * @param  {string} url  the url/endpoint you are trying to hit
   * @param  {[type]} body the body of the request that you want to send to have updated
   * @param  {object} headers *optional, if headers are passed they will over ride the existing headers
   * @return {promise}      return a promise so that the feature can chain to it
   */
  const options = ({ url, body, headers }) => {
    const newHeaders = headers || this.HEADERS;
    return _request(url, "OPTIONS", newHeaders, body);
  };

  /**
   * DELETE Wrapper for our 3rd part http request resource - this way the feature using the resources
   * just has to do APIClientResource.destroy (it isnt called "delete" as that is a reserved word)
   * WE MAY HAVE TO UPDATE THIS TO HAVE A BODY - BUT I DONT THINK THIS SHOULD BE USED THAT OFTEN
   * @param  {string} url  the url/endpoint you are trying to hit
   * @param  {object} headers *optional, if headers are passed they will over ride the existing headers
   * @return {promise}      return a promise so that the feature can chain to it
   */
  const destroy = ({ url, headers }) => {
    const newHeaders = headers || this.HEADERS;
    return _request(url, "DELETE", newHeaders, null);
  };

  return {
    getHeaders,
    post,
    fetch,
    put,
    options,
    destroy
  };
}

export default APIResource;
