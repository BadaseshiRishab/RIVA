const initialState = [];

const isSameItem = (a, b) => {
  if (!a || !b) return false;
  if (a.id !== undefined && b.id !== undefined) {
    return a.id === b.id;
  }
  return a.name === b.name;
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      if (!action.payload) return state;

      if (state.some((item) => isSameItem(item, action.payload))) {
        return state;
      }

      return [...state, action.payload];
    }
    case 'REMOVE_FROM_WISHLIST': {
      if (!action.payload && action.payload !== 0) return state;

      return state.filter((item, index) => {
        if (item && item.id !== undefined) {
          return item.id !== action.payload;
        }
        return index !== action.payload;
      });
    }
    default:
      return state;
  }
};

export default wishlistReducer;
