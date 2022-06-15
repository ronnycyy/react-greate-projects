import React from "react";
import { connect } from "react-redux";
import { add, reduce } from "../store/actions/couterAction";
import { fetchData } from "../store/actions/dataAction";
// 是一个函数，用于建立组件和store的state的映射关系
//
function mapStateToProps(state) {
  console.log(state);
  return {
    count: state.counter.count,
    data: state.data.data,
    loading: state.data.loading,
    error: state.data.error
  };
}
const mapDispatchToProps = {
  add,
  reduce,
  fetchData
};
class ReduxCounter extends React.Component {
  handleAdd = () => {
    this.props.add();
  };
  handleReduce = () => {
    this.props.reduce();
  };
  componentDidMount() {
    this.props.fetchData();
    // this.props.fetchData().then(res => {
    //   console.log("componentDidMount生命周期", res);
    // });
  }
  render() {
    const { error, loading, data } = this.props;
    if (error) {
      return <div>页面加载出错，{error}</div>;
    }
    if (loading) {
      return <div>页面正在加载中...</div>;
    }
    return (
      <div>
        <h3>我是Reduxcounter组件</h3>
        <ul>
          {data.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div>
          <button onClick={this.handleAdd}>加一</button>
          <span>{this.props.count}</span>
          <button onClick={this.handleReduce}>减一</button>
        </div>
      </div>
    );
  }
}
// 传入mapStateToProps这个参数后，组件便会订阅store中状态的变化，
// connect(mapStateToProps,ReduxCounter);
// connect是一个高阶函数   ，高阶组件
//mapDispatchToProps作为第二个参数传入
export default connect(mapStateToProps, mapDispatchToProps)(ReduxCounter);
