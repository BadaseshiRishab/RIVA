import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import Beauty from './pages/Beauty';
import Living from './pages/Living';
import Details from './pages/Details';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import setUser from './actions/setUser';
import { fetchCurrentUser, fetchMyOrders } from './services/api';
import addOrder from './actions/addOrder';
import clearOrders from './actions/clearOrders';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const restoreSession = async () => {
      try {
        dispatch(clearOrders());

        const [userResponse, ordersResponse] = await Promise.all([
          fetchCurrentUser().catch(() => null),
          fetchMyOrders().catch(() => []),
        ]);

        if (userResponse) {
          dispatch(setUser(userResponse.user || userResponse));
        }

        const userOrders = Array.isArray(ordersResponse)
          ? ordersResponse
          : ordersResponse?.orders || [];

        const mappedOrders = userOrders.map((order) => ({
          id: order._id || order.id,
          date: order.createdAt
            ? new Date(order.createdAt).toISOString().slice(0, 10)
            : new Date().toISOString().slice(0, 10),
          total: Number(order.total || 0).toFixed(2),
          status: order.status || 'Placed',
          items: order.items || [],
            shippingAddress: order.shippingAddress || {},
            paymentMethod: order.paymentMethod || 'cod',
            paymentId: order.paymentId || '',
        }));

        mappedOrders.forEach((order) => dispatch(addOrder(order)));
      } catch (error) {
        console.error('Session restore failed:', error);
        localStorage.removeItem('token');
      }
    };

    restoreSession();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/living" element={<Living />} />
        <Route path="/details" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
