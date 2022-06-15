import React from "react";
import store from "../store/index";

import { Provider } from "react-redux";
import ReduxCounter from "./ReduxCounter";

// connect 函数  provider组件
class ReduxComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  handleAdd = () => {
    this.setState({
      count: this.state.count + 1
    });
  };
  handleReduce = () => {
    this.setState({
      count: this.state.count - 1
    });
  };
  render() {
    return (
      <div>
        <h3>我是counter组件</h3>
        <div>
          <button onClick={this.handleAdd}>加一</button>
          <span>{this.state.count}</span>
          <button onClick={this.handleReduce}>减一</button>
          <Provider store={store}>
            <ReduxCounter />
          </Provider>
        </div>
      </div>
    );
  }
}
export default ReduxComponent;
