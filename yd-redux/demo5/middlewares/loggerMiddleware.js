const loggerMiddleware = (store) => (next) => (action) => {
  console.log('[ โฐ this state ]', store.getState());
  console.log('[ ๐ action ]', action);
  next(action);
  console.log('[ ๐next state ]', store.getState());
};
export default loggerMiddleware;
