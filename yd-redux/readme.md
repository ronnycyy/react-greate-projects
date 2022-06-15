1.现有的状态管理工具有哪些？
redux mobx mobx-state-tree redoil vuex

2.redux flux 思想一个工具
每一层分的非常清楚、整个状态管理清晰可见。麻烦！

3.mobx 强调的轻量 去掉了最最麻烦 Reducer
action+state 缺点：mobx @observer(函数组件)

react hooks ==> mobx-state-lite -> provider
provider {a:1}

    provider {a:1,b:2}

        provider

            provider
                [A]

mobx-state-tree（action \*） + mobx-state-lite 去掉

4.useReducer 入职了 react

5.recoil atom 原子状态，selector --> action

6.vuex 分成 2 版本 new Vue({})
provide() inject()
