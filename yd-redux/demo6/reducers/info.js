let initState = {
  info: {
    name: '京程一灯',
    description: '跟老袁冲击月薪3万🏮',
  },
};
export default function reducer(state, action) {
  if (!state) {
    state = initState;
  }
  switch (action.type) {
    case 'SET_NAME': {
      return {
        ...state,
        name: action.name,
      };
    }
    case 'SET_DECREMENT': {
      return {
        ...state,
        description: action.description,
      };
    }
    default:
      return state;
  }
}
