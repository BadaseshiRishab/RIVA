import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import setUser from '../actions/setUser';
import clearOrders from '../actions/clearOrders';
import { registerUser } from '../services/api';

function CreateAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await registerUser(formData);
      localStorage.setItem('token', response.token);
      dispatch(clearOrders());
      dispatch(setUser(response.user));
      navigate('/');
    } catch (err) {
      setError(err.message || 'Account creation failed');
    }
  };

  return (
    <div className="container-fluid">
      <Navbar />

      <div className="auth-page">
        <div className="auth-card">
          <p className="auth-kicker">Create account</p>
          <h2>Sign up</h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <p className="auth-error">{error}</p>}

            <label className="auth-field">
              <span>Full name</span>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
            </label>

            <label className="auth-field">
              <span>Email address</span>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
            </label>

            <label className="auth-field">
              <span>Phone number</span>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="9876543210" />
            </label>

            <label className="auth-field">
              <span>Address</span>
              <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Your complete address" rows="3" />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" required />
            </label>

            <button type="submit" className="auth-button">Create account</button>
          </form>

          <div className="auth-footer">
            <span>Already have an account?</span>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CreateAccount;
