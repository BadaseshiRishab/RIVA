const initialState = [];

const getItemId = (item) => {
  if (!item) return null;
  if (item.id !== undefined && item.id !== null) return String(item.id);
  if (item._id !== undefined && item._id !== null) return String(item._id);
  return item.name ? String(item.name) : null;
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      if (!action.payload) return state;

      const productId = getItemId(action.payload);
      if (!productId) return state;

      const existingItem = state.find((item) => getItemId(item) === productId);

      if (existingItem) {
        return state.map((item) => {
          if (getItemId(item) !== productId) return item;

          const existingQty = Number(item.quantity || 1);
          const incomingQty = Number(action.payload.quantity || 1);

          return {
            ...item,
            quantity: existingQty + incomingQty,
          };
        });
      }

      return [...state, { ...action.payload, quantity: Number(action.payload.quantity || 1) }];
    }
    case 'REMOVE_FROM_CART': {
      if (!action.payload && action.payload !== 0) return state;

      return state.filter((item, index) => {
        if (item && getItemId(item)) {
          return getItemId(item) !== String(action.payload);
        }
        return index !== action.payload;
      });
    }
    case 'UPDATE_CART_QUANTITY': {
      if (!action.payload || !action.payload.id) return state;

      const targetId = String(action.payload.id);
      const nextQty = Number(action.payload.quantity || 1);

      if (nextQty <= 0) {
        return state.filter((item) => getItemId(item) !== targetId);
      }

      return state.map((item) => {
        if (getItemId(item) !== targetId) return item;
        return { ...item, quantity: nextQty };
      });
    }
    case 'CLEAR_CART': {
      return [];
    }
    default:
      return state;
  }
};

export default cartReducer;
