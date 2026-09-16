import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import logo from '../images/logo.jpg'

function Navbar() {
  const cartItems = useSelector((state) => state.cart || []);
  const wishlistItems = useSelector((state) => state.wishlist || []);
  const user = useSelector((state) => state.user);
  const cartCount = cartItems.reduce((total, item) => total + Number(item.quantity || 1), 0);

  return (
    <div className="navbar-wrapper">
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-fixed">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="Logo" width="40" className="d-inline-block align-text-top"/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/men">Men</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/women">Women</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/kids">Kids</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/beauty">Beauty</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/living">Living</Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-2 ms-auto">
                        <Link to="/wishlist" className="cart-badge-wrap position-relative text-decoration-none text-dark">
                            <span className="cart-icon" aria-label="Wishlist">♡</span>
                            <span className="cart-count">{wishlistItems.length}</span>
                        </Link>
                        <Link to="/cart" className="cart-badge-wrap position-relative text-decoration-none text-dark">
                            <span className="cart-icon" aria-label="Shopping cart">🛒</span>
                            <span className="cart-count">{cartCount}</span>
                        </Link>
                        {user ? (
                            <>
                                {user.role === 'admin' && <Link to="/admin" className="admin-nav-link">Admin</Link>}
                                <Link to={user.role === 'admin' ? '/admin' : '/profile'} className="user-pill user-pill-link">Hi, {user.name?.split(' ')[0] || 'there'}</Link>
                            </>
                        ) : (
                            <Link to="/login" className="user-pill user-pill-link">Login</Link>
                        )}
                    </div>
                </div>
            </div>
            </nav>
            <Outlet/>
    </div>
  )
}

export default Navbar