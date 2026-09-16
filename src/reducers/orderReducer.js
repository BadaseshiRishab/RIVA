const initialState = [];

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ORDER': {
      if (!action.payload) return state;
      return [...state, action.payload];
    }
    case 'CLEAR_ORDERS': {
      return [];
    }
    default:
      return state;
  }
};

export default orderReducer;
