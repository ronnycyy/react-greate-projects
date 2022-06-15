import React from "react";
import App from "../shared/App";
import { matchPath } from "react-router-dom";
import routes from "../shared/Routes";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createServerStore } from "../shared/store";

export default (ctx) => {
  return new Promise((resolve, reject) => {
    // 在路由里去匹配下我们的路由
    const promises = [];
    const store = createServerStore();
    routes.some((route) => {
      // matchPath 就是匹配前端的路由
      const match = matchPath(ctx.request.path, route);
      // 如果匹配到了前端路由，并且有这个方法，
      if (match && route.loadData) promises.push(route.loadData(store));
      return match;
    });
    Promise.all(promises).then((data) => {
      console.log('data',data);
        // 挂载到ctx上，方便渲染到页面上
        ctx.store = store;  
      // 真正的请求完成的时候
      // 多异步接口必须得全部加载完才能返回页面
      // console.log(data);
      resolve(
        <Provider store={store}>
          <StaticRouter location={ctx.req.url}>
            <App />
          </StaticRouter>
        </Provider>
      );
    });
  });
};