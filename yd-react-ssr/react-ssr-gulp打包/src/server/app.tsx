import Koa from "koa";
const fs = require("fs");
const path = require("path");
import Router from "@koa/router";
import serve from "koa-static";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { matchPath } from "react-router-dom";
import routes from "../shared/Routes";
import React from "react";
import App from "../shared/App";
import { Provider } from "react-redux";
import { createServerStore } from "../shared/store";
const app = new Koa();
const router = new Router();
const fileResolve = (file) => path.resolve(__dirname, file);
const template = fs.readFileSync(fileResolve("assets/layout.html"), "utf8");
const serverBundle = require("./scripts/server-entry").default;
function templating(template) {
  return (props) =>
    template.replace(
      `<div id="root"></div>`,
      `<div id="root">${props.html}</div>${props.store}`
    );
}
//  yarn add -D @types/koa__router
router.get(["/", "/about"], async (ctx: Koa.Context, next) => {
  //   第一次优化
  // console.log(data);
  // const html = renderToString(
  //   <Provider store={store}>
  //     <StaticRouter location={ctx.req.url}>
  //       <App />
  //     </StaticRouter>
  //   </Provider>
  // );
  // ctx.body = render({
  //     html,
  //     store:<script>window.REDUX_STORE = ${JSON.stringify(store.getState())}</script>
  // })
  // });
  // 原始的操作
  // ctx.body = `
  //     <!DOCTYPE html>
  //     <html lang="en">
  //     <head>
  //         <meta charset="UTF-8">
  //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //         <title>React SSR</title>
  //     </head>
  //     <body>
  //         <script>window.REDUX_STORE = ${JSON.stringify(
  //           store.getState()
  //         )}</script>
  //         <div id="root">${html}</div>
  //         <script src="bundle.js"></script>
  //     </body>
  //     </html>
  // `;
  // 第三次优化
  const render = templating(template);
  const jsx = await serverBundle(ctx);
  const html = renderToString(jsx);
  const body1 = render({
    html,
    store: `<script>window.REDUX_STORE = ${JSON.stringify(
      ctx.store.getState()
    )}</script>`,
  });
  console.log("body1", body1);
  ctx.body = body1;
  ctx.type = "text/html";
});
router.get("/getData", (ctx) => {
  ctx.body = {
    code: 0,
    message: "",
    data: "后端返回的数据",
  };
});
app.use(serve("assets"));
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
