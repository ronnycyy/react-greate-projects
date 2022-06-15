import React, { useContext } from "react";
import { context, ContextProvider } from "./ContextProvider";
import { context2, ContextProvider2 } from "./ContextProvider2";
import { useNumber } from "./useNumber";

function SubCount() {
  const { count = 0, add, reduce } = useContext(context);
  const { val = "我是默认值" } = useContext(context2);
  const [number, setNumber] = useNumber();
  console.log("useNumer1111", number, setNumber);
  return (
    <div>
      <h1>我是subcout组件</h1>
      <p>
        {count}--{val}
      </p>
      <button onClick={add}>加</button>
      <button onClick={reduce}>减</button>
    </div>
  );
}
export default () => (
  <ContextProvider2>
    <ContextProvider>
      <SubCount />
    </ContextProvider>
  </ContextProvider2>
);
