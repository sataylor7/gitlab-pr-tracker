/**
 * @description Given a hash of errors, update it w/ new errors and set any existing ones to ""
 * @param {Object} errors - an object containing key/value error pairs
 * @param {Object} errorPayload - an object containing the errors to update
 */
export const returnNewErrors = (errors = {}, errorPayload = {}) => {
  const keys = [...Object.keys(errors), ...Object.keys(errorPayload)];
  const newErrors = {};

  keys.forEach(error => {
    newErrors[error] = errorPayload[error] || "";
  });

  return newErrors;
};

export default returnNewErrors;
