export const FETCH_DATA_BEGIN = "FETCH_DATA_BEGIN";
export const FETCH_DATA_SUCCESSS = "FETCH_DATA_SUCCESSS";
export const FETCH_DATA_FAIL = "FETCH_DATA_FAIL";

export const fetDataBegin = () => ({
  type: "FETCH_DATA_BEGIN"
});
export const fetDataSuccess = (data) => ({
  type: "FETCH_DATA_SUCCESSS",
  payLoad: { data }
});
export const fetDataFail = (error) => ({
  type: "FETCH_DATA_FAIL",
  payLoad: { error }
});

// thunk action redux-thunk
export function fetchData() {
  return (dispatch, getState) => {
    // 请求前 loading true
    dispatch(fetDataBegin());
    return fetch("https://mock.yonyoucloud.com/mock/2320/api/userInfo")
      .then(res => res.json())
      .then(json => {
        // 请求成功  loading false
        console.log("获取到的接口数据", json);
        dispatch(fetDataSuccess(json));
        return json;
      })
      .catch(error => {
        dispatch(fetDataFail(error));
        // 捕获到错误 loading false
      });
  };
}
