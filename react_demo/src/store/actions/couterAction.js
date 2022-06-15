export const ADD = "ADD";
export const REDUCE = "REDUCE";

/* 
    action creator  
*/

export const add = () => ({ type: ADD });
export const reduce = () => ({ type: REDUCE });

// 显然不行，redux不支持这种action
// redux-thunk thunk action
// export const getInfo = () =>{
//     return (dispatch,getState)=>{
//         // 进行不纯的操作
//     }
// }
// dispatch(getInfo());
