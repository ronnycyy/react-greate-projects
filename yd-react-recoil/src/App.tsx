import React, { FC } from 'react';
import './App.css';
import { atom, useRecoilState, selector, useRecoilValue } from './recoil';

const textState = atom({
  key: 'textState',
  default: '京程一灯🏮',
});
const charCountState = selector({
  key: 'charCountState',
  get: ({ get }) => {
    const text = get(textState);
    return text.length;
  },
});
const App: FC = () => {
  const [text, setText] = useRecoilState(textState);
  const value = useRecoilValue(charCountState);
  const onClick = () => {
    console.log('[ 随机数 ]', Math.random());
    // console.log('🐻', setText(Math.random().toString()));
    setText(Math.random().toString());
  };
  // const count = useRecoilValue(textState);
  return (
    <div className="App">
      <h1>{text}</h1>
      <h3>{value}</h3>
      <hr />
      <button onClick={onClick}>修改数据</button>
    </div>
  );
};

export default App;
