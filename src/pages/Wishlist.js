import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import addToCart from '../actions/addToCart';
import removeFromWishlist from '../actions/removeFromWishlist';

function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist || []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  if (!wishlistItems.length) {
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="wishlist-page empty-wishlist">
          <div className="wishlist-empty-card">
            <h2>Your wishlist is empty</h2>
            <p>Save products you love and come back to them anytime.</p>
            <Link to="/" className="wishlist-cta">Browse products</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <Navbar />

      <div className="wishlist-page">
        <div className="wishlist-header">
          <div>
            <p className="wishlist-kicker">Saved for later</p>
            <h2>My wishlist</h2>
          </div>
          <span className="wishlist-count">{wishlistItems.length} items</span>
        </div>

        <div className="wishlist-grid">
          {wishlistItems.map((item, index) => (
            <article key={`${item.id ?? item.name ?? 'wishlist'}-${index}`} className="wishlist-card">
              <img src={item.image} alt={item.name} className="wishlist-image" />

              <div className="wishlist-body">
                <h3>{item.name}</h3>
                <p className="wishlist-price">₹ {item.price}</p>
                <p className="wishlist-description">{item.description || 'A product you saved for later.'}</p>
              </div>

              <div className="wishlist-actions">
                <button type="button" className="wishlist-primary" onClick={() => handleAddToCart(item)}>
                  Add to cart
                </button>
                <button type="button" className="wishlist-secondary" onClick={() => handleRemove(item.id ?? index)}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Wishlist;
