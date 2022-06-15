import { useEffect, useState } from "react";

export function useNumber() {
  let [number, setNumber] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setNumber(number => number + 1);
    }, 1000);
  }, []);
  return [number, setNumber];
}
