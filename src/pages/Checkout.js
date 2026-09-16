import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import clearCart from '../actions/clearCart';
import addOrder from '../actions/addOrder';
import { createOrderRequest, createRazorpayOrder } from '../services/api';

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart || []);
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    payment: 'card',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((total, item) => {
    const quantity = Number(item.quantity || 1);
    return total + Number(item.price || 0) * quantity;
  }, 0);
  const shipping = subtotal > 0 ? 49 : 0;
  const total = subtotal + shipping;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const payload = {
        items: cartItems.map((item) => ({
          productId: item.id || item._id,
          name: item.name,
          price: Number(item.price || 0),
          image: item.image,
          quantity: Number(item.quantity || 1),
        })),
        total: Number(total.toFixed(2)),
        shippingAddress: {
          email: formData.email,
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
        },
        paymentMethod: formData.payment,
      };

      let paymentDetails = {};

      if (formData.payment !== 'cod') {
        if (!window.Razorpay) {
          throw new Error('Payment checkout is unavailable. Please refresh and try again.');
        }

        const razorpayOrder = await createRazorpayOrder(payload.items);
        paymentDetails = await new Promise((resolve, reject) => {
          const payment = new window.Razorpay({
            key: razorpayOrder.keyId,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            name: 'RIVA Store',
            description: 'RIVA Store purchase',
            order_id: razorpayOrder.id,
            prefill: {
              name: formData.fullName,
              email: formData.email,
              contact: formData.phone,
            },
            handler: resolve,
            modal: {
              ondismiss: () => reject(new Error('Payment was cancelled')),
            },
          });

          payment.on('payment.failed', () => reject(new Error('Payment failed. Please try again.')));
          payment.open();
        });
      }

      const createdOrder = await createOrderRequest({
        ...payload,
        ...paymentDetails,
        razorpayOrderId: paymentDetails.razorpay_order_id,
        razorpayPaymentId: paymentDetails.razorpay_payment_id,
        razorpaySignature: paymentDetails.razorpay_signature,
      });
      dispatch(addOrder({
        id: createdOrder._id || `#${Date.now().toString().slice(-4)}`,
        date: createdOrder.createdAt ? new Date(createdOrder.createdAt).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
        total: Number(createdOrder.total || total).toFixed(2),
        status: createdOrder.status || 'Placed',
        items: createdOrder.items || payload.items,
        shippingAddress: createdOrder.shippingAddress || payload.shippingAddress,
        paymentMethod: createdOrder.paymentMethod || payload.paymentMethod,
        paymentId: createdOrder.paymentId || paymentDetails.razorpay_payment_id || '',
      }));
      dispatch(clearCart());
      navigate('/orders');
    } catch (error) {
      console.error('Order creation failed:', error);
      alert(error.message || 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cartItems.length) {
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="checkout-page empty-checkout">
          <div className="checkout-empty-card">
            <h2>Your cart is empty</h2>
            <p>Add something you love before checkout.</p>
            <Link to="/" className="checkout-cta">Continue shopping</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <Navbar />

      <div className="checkout-page">
        <div className="checkout-header">
          <div>
            <p className="eyebrow">Secure checkout</p>
            <h2>Complete your order</h2>
          </div>
          <span className="checkout-badge">{cartItems.length} item{cartItems.length > 1 ? 's' : ''}</span>
        </div>

        <div className="checkout-layout">
          <form id="checkout-form" className="checkout-form-panel" onSubmit={handlePlaceOrder}>
            <section className="checkout-section">
              <h3>Shipping details</h3>
              <div className="form-grid">
                <label className="checkout-field full-width">
                  <span>Email</span>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
                </label>

                <label className="checkout-field full-width">
                  <span>Full name</span>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required />
                </label>

                <label className="checkout-field">
                  <span>Phone</span>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
                </label>

                <label className="checkout-field">
                  <span>City</span>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Mumbai" required />
                </label>

                <label className="checkout-field full-width">
                  <span>Address</span>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street address" required />
                </label>

                <label className="checkout-field">
                  <span>State</span>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Maharashtra" required />
                </label>

                <label className="checkout-field">
                  <span>Postal code</span>
                  <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="400001" required />
                </label>
              </div>
            </section>

            <section className="checkout-section">
              <h3>Payment method</h3>
              <div className="payment-options">
                <label className="payment-option">
                  <input type="radio" name="payment" value="card" checked={formData.payment === 'card'} onChange={handleChange} />
                  <span>Card</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" value="upi" checked={formData.payment === 'upi'} onChange={handleChange} />
                  <span>UPI</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" value="cod" checked={formData.payment === 'cod'} onChange={handleChange} />
                  <span>Cash on delivery</span>
                </label>
              </div>
            </section>
          </form>

          <aside className="checkout-summary-panel">
            <h3>Order summary</h3>

            <div className="checkout-items-list">
              {cartItems.map((item, index) => (
                <div className="checkout-item" key={`${item.id ?? item._id ?? item.name ?? 'item'}-${index}`}>
                  <img src={item.image} alt={item.name} className="checkout-item-image" />
                  <div className="checkout-item-copy">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity || 1}</p>
                  </div>
                  <strong>₹ {Number(item.price || 0) * Number(item.quantity || 1)}</strong>
                </div>
              ))}
            </div>

            <div className="summary-box">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹ {subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>₹ {shipping.toFixed(2)}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span>₹ {total.toFixed(2)}</span>
              </div>
            </div>

            <button type="submit" className="checkout-btn" form="checkout-form" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : formData.payment === 'cod' ? 'Place order' : 'Pay securely'}
            </button>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Checkout;
