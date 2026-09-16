import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export function formatOrderNumber(orderId, index = 0) {
  const safeIndex = Number.isFinite(index) ? index : 0;

  if (typeof orderId === 'string' && orderId.startsWith('#')) {
    return orderId;
  }

  if (!orderId || typeof orderId !== 'string') {
    return `#${String(safeIndex + 1001)}`;
  }

  const mongoLikeId = orderId.match(/^[a-f0-9]{24}$/i);
  if (!mongoLikeId) {
    return `#${String(safeIndex + 1001)}`;
  }

  return `#${String(safeIndex + 1001)}`;
}

function Orders() {
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders || []);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  if (!user) {
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="profile-page empty-profile">
          <div className="profile-empty-card">
            <h2>Login required</h2>
            <p>Please log in to view your orders.</p>
            <Link to="/login" className="profile-cta">Login</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="orders-page empty-orders">
          <div className="profile-empty-card">
            <h2>No orders yet</h2>
            <p>Your placed orders will appear here after checkout.</p>
            <Link to="/" className="profile-cta">Shop now</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <Navbar />

      <div className="orders-page">
        <div className="orders-header">
          <div>
            <p className="profile-kicker">My orders</p>
            <h2>Order history</h2>
          </div>
        </div>

        <div className="orders-list">
          {orders.map((order, index) => {
            const firstItem = order.items?.[0]?.name || 'Your product';
            const orderStatusClass = `status-${String(order.status || 'placed').toLowerCase().replace(/\s+/g, '-')}`;
            const displayOrderId = formatOrderNumber(order.id, index);
            const orderKey = `${order.id ?? 'order'}-${index}`;
            const isExpanded = expandedOrderId === orderKey;
            const address = order.shippingAddress || {};

            return (
              <article key={orderKey} className="order-card">
                <div className="order-topline">
                  <div>
                    <span className="order-id">{displayOrderId}</span>
                    <p>{order.date}</p>
                  </div>
                  <span className={`order-status ${orderStatusClass}`}>
                    {order.status || 'Placed'}
                  </span>
                </div>

                <div className="order-body">
                  <h3>{firstItem}</h3>
                  <p>Total: <strong>₹ {order.total}</strong></p>
                </div>

                <button
                  type="button"
                  className="order-details-toggle"
                  onClick={() => setExpandedOrderId(isExpanded ? null : orderKey)}
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? 'Hide details' : 'View details'}
                </button>

                {isExpanded && (
                  <div className="order-details">
                    <div className="order-detail-section">
                      <h4>Products</h4>
                      <div className="order-detail-items">
                        {(order.items || []).map((item, itemIndex) => (
                          <div className="order-detail-item" key={`${item.productId ?? item.id ?? itemIndex}`}>
                            <div>
                              <strong>{item.name}</strong>
                              <span>Qty: {item.quantity || 1}</span>
                            </div>
                            <strong>₹ {(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}</strong>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="order-detail-grid">
                      <div className="order-detail-section">
                        <h4>Delivery details</h4>
                        <p>{address.fullName || 'Not available'}</p>
                        <p>{address.address || 'Address not available'}</p>
                        <p>{[address.city, address.state, address.postalCode].filter(Boolean).join(', ') || 'Location not available'}</p>
                        <p>{address.phone || 'Phone not available'}</p>
                        <p>{address.email || 'Email not available'}</p>
                      </div>

                      <div className="order-detail-section">
                        <h4>Payment</h4>
                        <p>{order.paymentMethod === 'cod' ? 'Cash on delivery' : String(order.paymentMethod || 'Online payment').toUpperCase()}</p>
                        {order.paymentId && <p>Payment ID: {order.paymentId}</p>}
                        <p>Order total: <strong>₹ {Number(order.total || 0).toFixed(2)}</strong></p>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Orders;
