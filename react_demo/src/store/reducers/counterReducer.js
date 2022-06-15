import { createStore } from "redux";

import { ADD, REDUCE } from "../actions/couterAction";
// store dispatch  ,
/* 
    对于action处理方式，放在一个单独的actions.js中  推荐

*/

// 定义一个初始值

const initialState = {
  count: 0
};

// store需要一个reducer
// (state,action) = newState
// 唯一的要点：但state变化时需要返回全新的对象，而不是修改传入的参数，
// 必须是纯的，遵守redux原则
export default function counterReducer(state = initialState, action) {
  /* if(action.type === 'ADD'){}else if   一大堆的if else 不推荐 */
  /* switch 应用场景比较简单 */
  /*场景复杂，创建一个对象通过action的type来查找对应的处理函数 */
  switch (action.type) {
    case ADD:
      // 不能直接修改state参数，state.count++;
      // 只能通过return的方式返回新的state
      return {
        count: state.count + 1
      };
    case REDUCE:
      return {
        count: state.count - 1
      };
    default:
      return state;
  }

  return state;
}
