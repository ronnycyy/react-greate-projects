import React, { useReducer } from "react";

// (state,action) => newState 和redux完全相同

// useReducer  接收三个参数

// 定义简单的reducer   第一个参数
const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return { ...state, count: state.count + 1 };
    case "reduce":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// 定义第二个参数 createStore() 指定默认值
let initialState = { count: 10, name: "reducer" };

// 定义第三个参数  ，函数，会把第二个参数当做参数执行
const init = initialState => {
  // 进行一些初始值的逻辑操作
  return { count: initialState.count + 2 };
};

// Store, Recucer,Action 三大核心redux

export default function ReducerComponent() {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "add" })}>加</button>
      <button onClick={() => dispatch({ type: "reduce" })}>减</button>
    </div>
  );
}

/* 
    

*/
