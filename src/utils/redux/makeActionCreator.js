/**
 * @description this is a version of the makeActionCreator from : https://redux.js.org/recipes/reducing-boilerplate#generating-reducers
 * this is for simple action creators that are functions that return an object {type, payload}
 * @param   {String}  type     action name
 * @param   {Object}  payload  the object to return to be dispatched
 *
 * @return  {Object}  returns object { type , payload}
 */
export default function makeActionCreator(type, payload) {
  return {
    type,
    payload
  };
}
