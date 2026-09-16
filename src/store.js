import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

export const loadState = () => {
    try {
        const savedState = localStorage.getItem('shopperState');
        if (!savedState) return undefined;

        const parsedState = JSON.parse(savedState);
        return parsedState && typeof parsedState === 'object' ? parsedState : undefined;
    } catch (error) {
        console.error('Failed to parse saved app state:', error);
        return undefined;
    }
};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadState(),
});

store.subscribe(() => {
    const state = store.getState();

    try {
        localStorage.setItem(
            'shopperState',
            JSON.stringify({
                user: state.user,
                cart: state.cart,
                wishlist: state.wishlist,
                orders: state.orders,
            })
        );
    } catch (error) {
        console.error('Failed to save app state:', error);
    }
});

export default store;