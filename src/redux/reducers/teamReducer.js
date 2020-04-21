const teamReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TEAMS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
export default teamReducer;
