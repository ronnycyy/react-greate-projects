import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
// 必须确保thunk包裹在applyMiddleware调用里面，否则不生效  ，不要直接传thunk
const store = createStore(rootReducer, applyMiddleware(thunk));

// 创建store 存放应用状态
export default store;
