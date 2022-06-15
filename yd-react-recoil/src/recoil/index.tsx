import { useCallback, useEffect, useState } from 'react';
interface Dissconnect {
  disconnect: () => void;
}
class Stateful<T> {
  constructor(protected value: T) {}
  //设置我们的监听器 类外部不能访问里面可以访问
  private listeners = new Set<(value: T) => void>();
  public subscribe(callback: (value: T) => void): Dissconnect {
    this.listeners.add(callback);
    return {
      disconnect: () => {
        this.listeners.delete(callback);
      },
    };
  }
  //常规的设置类库 这边一定要去设置方法不让直接原始构造函数的值
  public snapshot(): T {
    return this.value;
  }
  private emit() {
    console.log('[ 触发组件更新 ]', this.listeners);
    for (const listener of Array.from(this.listeners)) {
      listener(this.snapshot());
    }
  }
  //派生类能否访问
  protected update(value: T) {
    if (this.value !== value) {
      this.value = value;
      this.emit();
    }
  }
}

class Atom<T> extends Stateful<T> {
  public setState(value: T) {
    super.update(value);
  }
}

class Selector<T> extends Stateful<T> {
  constructor(private readonly generate: SelectorGenerator<T>) {
    super(undefined as any);
    this.value = generate({ get: (dep: Atom<any>) => this.addSub(dep) });
  }
  private registeredDeps = new Set<Atom<any>>();
  private addSub(dep: Atom<any>) {
    if (!this.registeredDeps.has(dep)) {
      dep.subscribe(() => this.updateSelcrtor());
    }
    return dep.snapshot();
  }
  //业务逻辑的值发生变化
  private updateSelcrtor() {
    this.update(this.generate({ get: (dep: Atom<any>) => this.addSub(dep) }));
  }
}

export function atom<V>(value: { key: string; default: V }) {
  return new Atom(value.default);
}
type SelectorGenerator<V> = (context: { get: <T>(dep: Atom<T>) => T }) => V;
//对数据进行更加丰富的操作
export function selector<V>(value: {
  key: string;
  get: SelectorGenerator<V>;
}): Selector<V> {
  return new Selector(value.get);
}
//react view 发生变化
export function useRecoilValue<T>(value: Stateful<T>) {
  const [, updateState] = useState({});
  useEffect(() => {
    const { disconnect } = value.subscribe(() => updateState({}));
    return () => disconnect();
  }, [value]);
  return value.snapshot();
}
//辅助类型
function tuplify<T extends any[]>(...elements: T) {
  return elements;
}

export function useRecoilState<T>(atom: Atom<T>) {
  const value = useRecoilValue(atom);
  return tuplify(
    value,
    useCallback((value) => atom.setState(value), [atom])
  );
}

// function useLoaing() {
//     const isLoading = true;
//     const load = 123;
//     return [isLoading, load];
// }
// const [isLoading] = useLoaing();
// function Yideng() {
//   const [isLoading] = useLoaing();
// }

// export function loaing() {
//   //   const data1: [string, number] = ['123', 1];
//   //   return data1;
//   const isLoading = true;
//   const load = 123;
//   return [isLoading, load];
// }

// const [aa] = loaing();

/**
 * 1.第一个字母大写的函数 函数组件
 * 2.useXXX就是Hooks 即使是简单函数也要写到函数组件里
 * 3.如果你在函数内部自定义的拼装了最终返回的元祖 那么就要结构开
 */
