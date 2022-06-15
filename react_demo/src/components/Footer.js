import React from "react";
// 通过class来定义类组件
class Footer extends React.Component {
  // 构造器函数，如果没有声明  默认添加
  constructor(props) {
    // ES6固定写法
    super(props);
    //组件内部的状态 setState
    this.state = {
      name1: props.name + "www",
      count: 0,
      isShow: true,
      userName:'受控组件默认值',
      txtVal:'txtVal受控组件默认值'
    };
    // this绑定
    this.handleAdd = this.handleAdd.bind(this);
    console.log("1.constructor初始化");
  }

  // 挂载阶段  1，2，3，4
  UNSAFE_componentWillMount() {
    console.log("2.componentWillMount执行，在render方法之前调用");
  }
  componentDidMount() {
    console.log(
      "4.componentDidMount函数已执行,组件挂载完之后,DOM元素已经插入到页面"
    );
  }
  handleAdd() {
    // 函数
    this.setState(state => ({
      // 基于当前state进行计算  保证拿到state一定是最新的
      count: ++state.count
    }));
    this.props.getChildData(this.state.count);
  }
  handleChange = (event)=>{
    console.log(event);
    event.preventDefault();
    this.setState({
        userName:event.target.value
    })
  }
  handTxtChange = (e)=>{
    this.setState({
        txtVal:e.target.value
    })
  }
  handleClick = () => {
    // 对象
    this.setState({ isShow: !this.state.isShow });
  };
  handleBtnClick(event,params){
    console.log('我是参数传递的值',event);
  }
  render() {
    console.log("3.render函数已执行");
    const { name, age } = this.props;

    return (
      <div>
        {this.state.isShow ? <h1>我是类组件</h1> : ""}
        <p>
          {this.state.name1}--{age}--{name}
          <input type="text" onChange={this.handleChange} value={this.state.userName}  />
          <textarea onChange={this.handTxtChange} value={this.state.txtVal}></textarea>
        </p>
        <button onClick={this.handleAdd}>点击加一{this.state.count}</button>
        <button onClick={this.handleClick}>显示隐藏</button>
        {/* <button onClick={this.handleBtnClick.bind(this,'传递的参数123')}>传递参数</button> */}
        <button onClick={(e)=>{this.handleBtnClick(e,'传递的参数456')}}>传递参数</button>
      </div>
    );
  }
  // 更新阶段
  UNSAFE_componentWillReceiveProps(nextProps) {
    // 只在props引起的组件更新过程中，才会被调用。
    // 不会在组件初始化props时调用这个方法，调用this.setState也不会触发
  }
  
  // 重要
  shouldComponentUpdate(nextProps,nextState) {
    //决定视图是否渲染，true渲染视图，false视图不渲染，必须要有这个返回值
    /*       
    if(nextProps.props.属性名 !== this.props.属性名 || nextState.state属性名 !== this.state.state属性名){
            return true;
        }else{
            return false;
        } 
    */
    return true;
  }
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    // 可以作为组件更新发生前执行某些工作的地方
  }
  componentDidUpdate(prevProps, prevState) {
    // 在更新发生后立即调用componentDidUpdate()。
  }

  // 卸载阶段  
  componentWillUnmount() {
    // 在组件被卸载并销毁之前立即被调用。在此方法中执行任何必要的清理，
    // 例如使定时器无效，取消网络请求或清理在componentDidMount中创建的任何监听。
  }

  // 错误处理阶段
  componentDidCatch(error, info) {
    //捕获错误
  }
}
export default Footer;
