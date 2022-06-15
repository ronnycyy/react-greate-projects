import React from "react";
import User from "./User";
import Footer from "./Footer";
function Component1() {
  const divTitle = "我是app";
  const props = { name: "一灯", age: 4 };
  // 创建一个ref
  const userRef = React.createRef();
  const inputRef = React.createRef();
  const divStyle = {
    color: "red",
    fontSize: "26px"
  };
  function handeClick() {
    // console.log("点击触发", inputRef.current);
    // inputRef.current.focus();
    console.log('非受控组件的值',inputRef.current.value);
  }
  function getChildData(data) {
    console.log("接收到子组件的值", data);
  }
  return (
    <>
      <div
        style={{ divStyle }}
        title={divTitle}
        className="App"
        tabIndex="1"
        dataid="1"
      >
        <h2>hello world</h2>
        <p>我是p标签</p>
        <button onClick={handeClick}>点击事件</button>
        <User name="一灯" />
        <Footer getChildData={getChildData} {...props} ref={userRef} />
        <input type="text" ref={inputRef} />
        <div
          dangerouslySetInnerHTML={{ __html: "<p>我是插入的html</p>" }}
        ></div>
        <div>
          <label htmlFor="name">用户名</label>
          <input id="name" ref={inputRef} defaultValue="我是非受控组件的默认值" type="text" />
        </div>
      </div>
    </>
  );
}
export default Component1;
