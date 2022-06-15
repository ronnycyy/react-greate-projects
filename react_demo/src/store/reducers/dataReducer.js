import { createStore } from "redux";
import {
  FETCH_DATA_BEGIN,
  FETCH_DATA_SUCCESSS,
  FETCH_DATA_FAIL
} from "../actions/dataAction";
// store dispatch  ,
/* 
    对于action处理方式，放在一个单独的actions.js中  推荐

*/

// 定义一个初始值

const initialState = {
  loading: true,
  data: [],
  error: null
};

// store需要一个reducer
// (state,action) = newState
// 唯一的要点：但state变化时需要返回全新的对象，而不是修改传入的参数，
// 必须是纯的，遵守redux原则
export default function dataReducer(state = initialState, action) {
  /* if(action.type === 'ADD'){}else if   一大堆的if else 不推荐 */
  /* switch 应用场景比较简单 */
  /*场景复杂，创建一个对象通过action的type来查找对应的处理函数 */
  switch (action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_DATA_SUCCESSS:
      return {
        ...state,
        loading: false,
        data: action.payLoad.data.list
      };
    case FETCH_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payLoad.error
      };
    default:
      return state;
  }

  return state;
}
