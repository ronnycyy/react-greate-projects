export default function createStore(
  reducer,
  initialState,
  rewriteCreateStoreFunc
) {
  if (rewriteCreateStoreFunc) {
    const newCreateStore = rewriteCreateStoreFunc(createStore);
    return newCreateStore(reducer, initialState);
  }
  let state = initialState;
  let listeners = [];
  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
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
  function replaceReducer(nextReducer) {
    reducer = nextReducer;
    dispatch({ type: Symbol() });
  }
  //对所有的状态进行一步初始化
  dispatch({ type: Symbol() });
  return {
    subscribe,
    getState,
    dispatch,
    replaceReducer,
  };
}
