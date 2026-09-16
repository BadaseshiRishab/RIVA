import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers/currentProduct';
import userReducer from './reducers/userReducer';
import orderReducer from './reducers/orderReducer';
import cartReducer from './reducers/cartReducer';
import wishlistReducer from './reducers/wishlistReducer';
import rootReducer from './reducers/rootReducer';
import ProductDetails from './components/ProductDetails';
import { normalizeProduct, getCategoryProducts } from './components/ProductSection';
import { loadState } from './store';
import clearOrders from './actions/clearOrders';
import { formatOrderNumber } from './pages/Orders';
import { fetchProducts } from './services/api';

test('stores the selected product as the product itself', () => {
  const product = {
    name: 'Test Product',
    image: 'https://example.com/product.jpg',
    price: 1999,
  };

  expect(
    reducer(undefined, { type: 'SET_CURRENT_PRODUCT', payload: product })
  ).toEqual(product);
});

test('renders an add to cart button and adds the product to the cart', () => {
  const product = {
    id: 101,
    name: 'Test Product',
    image: 'https://example.com/product.jpg',
    price: 1999,
    description: 'A sleek product for testing.',
  };

  const store = configureStore({ reducer: rootReducer });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductDetails product={product} />
      </MemoryRouter>
    </Provider>
  );

  const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
  fireEvent.click(addToCartButton);

  expect(store.getState().cart).toHaveLength(1);
  expect(store.getState().cart[0]).toMatchObject(product);
});

test('stores the logged in user profile after login', () => {
  const user = {
    id: 1,
    name: 'Jane Doe',
    email: 'jane@example.com',
  };

  expect(
    userReducer(undefined, { type: 'SET_USER', payload: user })
  ).toEqual(user);

  expect(
    userReducer(user, { type: 'CLEAR_USER' })
  ).toEqual(null);
});

test('formats order numbers into a customer-friendly label instead of a raw Mongo ID', () => {
  expect(formatOrderNumber('507f1f77bcf86cd799439011', 0)).toBe('#1001');
  expect(formatOrderNumber('507f1f77bcf86cd799439012', 1)).toBe('#1002');
});

test('stores completed checkout orders in the order history', () => {
  const order = {
    id: '#1001',
    total: 2499,
    status: 'Placed',
    date: '2026-09-12',
  };

  expect(
    orderReducer(undefined, { type: 'ADD_ORDER', payload: order })
  ).toEqual([order]);
});

test('clears stale orders when switching users', () => {
  const staleOrders = [{ id: '#old-user-order', total: 1999, status: 'Placed', date: '2026-09-11' }];

  expect(orderReducer(staleOrders, clearOrders())).toEqual([]);
});

test('restores saved user profile on refresh', () => {
  const savedUser = {
    id: 42,
    name: 'John Smith',
    email: 'john@example.com',
  };

  localStorage.setItem('shopperState', JSON.stringify({ user: savedUser }));

  expect(loadState()).toMatchObject({ user: savedUser });

  localStorage.removeItem('shopperState');
});

test('restores saved previous orders on refresh', () => {
  const savedOrders = [
    {
      id: '#1002',
      total: 1999,
      status: 'Placed',
      date: '2026-09-12',
      items: [{ name: 'Classic Tee', price: 999 }, { name: 'Denim Jacket', price: 1000 }],
    },
  ];

  localStorage.setItem('shopperState', JSON.stringify({ orders: savedOrders }));

  expect(loadState()).toMatchObject({ orders: savedOrders });

  localStorage.removeItem('shopperState');
});

test('does not duplicate cart items with the same id', () => {
  const product = { id: 7, name: 'Reusable Bottle', price: 999, image: 'https://example.com/bottle.jpg' };

  const state = cartReducer(
    [product],
    { type: 'ADD_TO_CART', payload: product }
  );

  expect(state).toHaveLength(1);
  expect(state[0]).toMatchObject(product);
});

test('does not duplicate wishlist items with the same id', () => {
  const product = { id: 8, name: 'Travel Mug', price: 799, image: 'https://example.com/mug.jpg' };

  const state = wishlistReducer(
    [product],
    { type: 'ADD_TO_WISHLIST', payload: product }
  );

  expect(state).toHaveLength(1);
  expect(state[0]).toMatchObject(product);
});

test('normalizes MongoDB product data for category pages', () => {
  const product = {
    _id: 'abc123',
    name: 'Mongo Product',
    category: 'women',
    description: 'Loaded from MongoDB',
    price: 1200,
    image: 'https://example.com/mongo.jpg',
  };

  expect(normalizeProduct(product)).toMatchObject({
    id: 'abc123',
    name: 'Mongo Product',
    category: 'women',
    description: 'Loaded from MongoDB',
    price: '1200',
    image: 'https://example.com/mongo.jpg',
  });

  expect(getCategoryProducts([product], 'women')).toHaveLength(1);
});

test('falls back to the built-in catalog when the API is unavailable', async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

  const products = await fetchProducts();

  expect(Array.isArray(products)).toBe(true);
  expect(products.length).toBeGreaterThan(0);
  expect(products.some((product) => product.category === 'men')).toBe(true);
  expect(products.some((product) => product.category === 'women')).toBe(true);
});
