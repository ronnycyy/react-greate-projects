const Koa = require("koa");
const app = new Koa();
const Router = require("@koa/router");
const serve = require("koa-static");

import React from "react";
import { StaticRouter, matchPath } from "react-router-dom";
import { renderToString } from "react-dom/server";
import App from "../shared/App";
import rotues from "../shared/Routes";
import { Provider } from "react-redux";
import { createServerStore } from "../shared/store";

const router = new Router();

router.get(["/", "/about"], async (ctx, next) => {
  const promises = [];
  const store = createServerStore();
  let html = "";
  rotues.some((route) => {
    const match = matchPath(ctx.request.path, route);
    if (match && route.loadData) {
      promises.push(route.loadData(store));
    }
    return match;
  });
  await Promise.all(promises).then((data) => {
    console.log("data", data);
    html = renderToString(
      <Provider store={store}>
        <StaticRouter location={ctx.req.url}>
          <App />
        </StaticRouter>
      </Provider>
    );
  });
  console.log("html", html);
  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React SSR</title>
    </head>
    <body>
        <div id="root">${html}</div>
        <script>
        window.REDUX_STORE = ${JSON.stringify(
          store.getState()
        )}</script>
        <script src="bundle.js"></script>
    </body>
    </html>`;
});
router.get("/getData", (ctx) => {
  ctx.body = {
    code: 0,
    message: "",
    data: "后端返回的数据",
  };
});

// app.use(ctx => {
//     ctx.body = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>React SSR</title>
//     </head>
//     <body>
//         <div id="root">demo</div>
//         <script src="bundle.js"></script>
//     </body>
//     </html>
//     `;
//     ctx.type = 'text/html'
// })
app.use(serve("assets"));

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
