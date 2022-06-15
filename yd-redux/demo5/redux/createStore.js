export default function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];
  function subscribe(listener) {
    listeners.push(listener);
  }
  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }
  //对所有的状态进行一步初始化
  dispatch({ type: Symbol() });
  return {
    subscribe,
    getState,
    dispatch,
  };
}
