import React from "react";
import "./assets/css/App.css";
import Home from "./components/Home";
import About from "./components/About";
import Info from "./components/Info";
import NotFound from "./components/NotFound";
import {
  Route,
  Link,
  Switch,
  NavLink,
  Redirect,
  withRouter
} from "react-router-dom";

// 根组件  函数组件
function App(props) {
  const isLogIn = true;
  console.log("app", props.history);
  return (
    <>
      {/* link组件一定要位于BrowserRouter */}
      <div>
        <Link to={{ pathname: "/home", search: "?name=yideng" }}>
          跳转到home
        </Link>
      </div>
      <div>
        <NavLink activeStyle={{ color: "red" }} to="/about">
          跳转到about
        </NavLink>
      </div>
      <Switch>
        {/* 没有指定path,无论访问什么路径，都会匹配 */}
        {/* 如果第一个匹配到了，就不再往下匹配了 */}
        <Route
          path="/info"
          render={() => {
            return isLogIn ? <Info /> : <Redirect to="home" />;
          }}
        />
        <Route path="/" exact component={Info} />
        <Route path="/home" component={Home} />
        <Route path="/about/:id" component={About} />
        <Route component={NotFound} />
      </Switch>
      {/* <Route
        path="/render"
        render={() => {
          // 逻辑操作
          return <h1>我是render渲染的</h1>;
        }}
      />
      <Route
        path="/children"
        children={({ match }) => {
          // 逻辑操作
          return <h1>我是children渲染的{match ? match.path : "" + match}</h1>;
        }}
      /> */}
    </>
  );
}

export default withRouter(App);
