import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import removeFromCart from '../actions/removeFromCart';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart || []);

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const updateQuantity = (productId, change) => {
    const item = cartItems.find((cartItem) => String(cartItem.id ?? cartItem._id ?? cartItem.name) === String(productId));
    if (!item) return;

    const nextQty = Number(item.quantity || 1) + change;

    if (nextQty <= 0) {
      removeItem(productId);
      return;
    }

    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { id: productId, quantity: nextQty },
    });
  };

  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.price || 0);
    const quantity = Number(item.quantity || 1);
    return total + price * quantity;
  }, 0);

  const totalUnits = cartItems.reduce((total, item) => total + Number(item.quantity || 1), 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!cartItems.length) {
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="cart-page empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add a few products to get started.</p>
          <Link to="/" className="cart-cta">Continue Shopping</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <Navbar />

      <div className="cart-page">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <span>{totalUnits} item{totalUnits > 1 ? 's' : ''}</span>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={`${item.id ?? item._id ?? item.name ?? 'item'}-${index}`}>
                <img src={item.image} alt={item.name} className="cart-item-image" />

                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>Price: ₹ {item.price}</p>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id ?? item._id ?? item.name, -1)}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id ?? item._id ?? item.name, 1)}>+</button>
                  </div>
                </div>

                <button
                  type="button"
                  className="remove-cart-item"
                  onClick={() => removeItem(item.id ?? item._id ?? item.name)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h3>Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹ {subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹ {subtotal.toFixed(2)}</span>
            </div>
            <button type="button" className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
