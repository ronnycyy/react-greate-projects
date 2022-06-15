import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from "react";
import SubCount from "./SubCount";
import ReducerComponet from "./ReducerComponent";
import { useNumber } from "./useNumber";

function HookComponent() {
  // 2.首次渲染的时候才会执行，
  // 首次执行  count { a: 1 }
  // 再次执行  获取到的就不是初始值，闭包中的缓存值
  const number1 = 2;
  const [number, setNumber] = useNumber();
  console.log('useNumer',number,setNumber);
  // id
  const refInput = useRef(null);
  // 任意类型
  let [count, setCount] = useState(() => {
    // 这里进行逻辑运算
    return 10 * number1;
  });
  // useState允许使用多次
  let [num, setNum] = useState(100);
  let [refresh, setRefresh] = useState(100);
  // dom渲染完成之后才会执行
  useEffect(() => {
    console.log("refInput", refInput);
    refInput.current.focus();
  }, []);
  useEffect(() => {
    // ajax
    setTimeout(() => {
      setCount(count => {
        return ++count;
      });
    }, 1500);
    console.log("我是副作用函数");

    // 1.组件卸载前
    // 2. 下一个effect前
    function clear() {
      // 清理工作
      console.log("我是清除函数");
    }
    return clear;
    // 浅比较
    // 定义第二个参数，告诉react不依赖与props,state
  }, [refresh]);
  /* 
    1.dom渲染完成，副作用执行，useEffect
    2.副作用执行过程中，修改了count,state状态被修改，重点
    3.state改变-》引发重新渲染
    4.无限循环
*/
  function handleAdd() {
    // 可以是任意类型，state的改变都是异步，
    setCount(count => {
      return ++count;
    });
    console.log(num, setNum);
  }
  // 闭包  实现缓存， 占用内存   不能盲目使用
  //
  const memorized = useCallback(() => {
    return count;
  }, [num]);
  const memorized2 = useMemo(() => {
    return count;
  }, [num]);
  console.log("记忆", memorized());
  console.log("记忆2", memorized2);
  console.log("原始", count);

  function changeNum() {
    setNum(num => {
      return ++num;
    });
  }
  return (
    <div>
      <h1>我是hook组件</h1>
      <p>state值---{count}</p>
      <button onClick={handleAdd}>点击加1</button>

      <button
        onClick={() => {
          setRefresh(!refresh);
        }}
      >
        重新请求
      </button>
      <SubCount />
      <ReducerComponet />
      <label htmlFor="name"></label>
      <input type="text" id="name" ref={refInput} />
      <button onClick={changeNum}>改变num依赖项</button>
    </div>
  );
}
export default HookComponent;
