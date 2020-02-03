// Returns Undefined to Reboot Reducers
export const clearState = () => {
  try {
    localStorage.clear();
  } catch (err) {
    //@TODO log error;
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("ecards-user-app");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("ecards-user-app", serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
