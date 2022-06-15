import React, { createContext, useState } from "react";

export const context = createContext({});
export function ContextProvider({ children }) {
  const [count, setCount] = useState(10);

  const conutVal = {
    count,
    setCount,
    add: () => setCount(count + 1),
    reduce: () => setCount(count - 1)
  };
  // context对象中，提供了一个自带的Provider组件  useContext
  return <context.Provider value={conutVal}>{children}</context.Provider>;
}
