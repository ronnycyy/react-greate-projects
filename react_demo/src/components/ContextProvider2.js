import React, { createContext, useState } from "react";

export const context2 = createContext({});
export function ContextProvider2({ children }) {
  const [val, setVal] = useState("我是context2");

  const value = {
    val,
    setVal
  };
  // context对象中，提供了一个自带的Provider组件  useContext
  return <context2.Provider value={value}>{children}</context2.Provider>;
}
