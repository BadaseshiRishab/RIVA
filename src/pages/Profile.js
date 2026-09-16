import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { updateProfile } from '../services/api';
import setUser from '../actions/setUser';
import logoutUser from '../actions/logoutUser';
import clearOrders from '../actions/clearOrders';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const formatDateTime = (value) => {
    if (!value) return 'Not available';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Not available';

    return date.toLocaleString();
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('');

    try {
      const response = await updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });

      dispatch(setUser(response.user));
      setStatus('Your account details were updated successfully.');
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Unable to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearOrders());
    dispatch(logoutUser());
  };

  if (!user) {
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="profile-page empty-profile">
          <div className="profile-empty-card">
            <h2>Login required</h2>
            <p>Please log in to view your profile.</p>
            <Link to="/login" className="profile-cta">Login</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <Navbar />

      <div className="profile-page">
        <div className="profile-header">
          <div>
            <p className="profile-kicker">My account</p>
            <h2>{user.name}</h2>
          </div>
          <button type="button" className="logout-btn profile-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="profile-layout">
          <aside className="profile-card">
            <div className="profile-avatar">{user.name?.charAt(0)?.toUpperCase() || 'U'}</div>
            <h3>Account information</h3>
            <div className="profile-info-list">
              <p><span>Name</span><strong>{user.name}</strong></p>
              <p><span>Email</span><strong>{user.email}</strong></p>
              <p><span>Phone</span><strong>{user.phone || 'Not added yet'}</strong></p>
              <p><span>Address</span><strong>{user.address || 'Not added yet'}</strong></p>
              <p><span>Last active</span><strong>{formatDateTime(user.lastLoginAt)}</strong></p>
            </div>
          </aside>

          <div className="profile-panel">
            <div className="profile-summary-box quick-links-box">
              <h3>Quick links</h3>
              <div className="profile-links">
                <Link to="/orders">View orders</Link>
                <Link to="/wishlist">Wishlist</Link>
                <Link to="/cart">Cart</Link>
              </div>
            </div>

            {!isEditing ? (
              <div className="profile-summary-box profile-actions-box">
                <h3>Personal details</h3>
                <p>Manage your contact details and shipping information.</p>
                <button type="button" className="auth-button" onClick={() => setIsEditing(true)}>
                  Update details
                </button>
              </div>
            ) : (
              <div className="profile-summary-box">
                <div className="profile-edit-header">
                  <h3>Edit personal details</h3>
                  <button type="button" className="secondary-link-button" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                  {error && <p className="auth-error">{error}</p>}
                  {status && <p className="auth-success">{status}</p>}

                  <label className="auth-field">
                    <span>Name</span>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                  </label>

                  <label className="auth-field">
                    <span>Email</span>
                    <input type="email" name="email" value={formData.email} disabled />
                  </label>

                  <label className="auth-field">
                    <span>Phone number</span>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="9876543210" />
                  </label>

                  <label className="auth-field">
                    <span>Address</span>
                    <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" rows="4" />
                  </label>

                  <button type="submit" className="auth-button">Save changes</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
