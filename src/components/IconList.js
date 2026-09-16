import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import setCurrentProduct from '../actions/setCurrentProduct'
import addToCart from '../actions/addToCart'
import addToWishlist from '../actions/addToWishlist'
import removeFromWishlist from '../actions/removeFromWishlist'

function IconList({ product, onDetails, onWishlist, onCart }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wishlistItems = useSelector((state) => state.wishlist || []);
    const productId = product.id ?? product._id ?? product.name;
    const isWishlisted = wishlistItems.some((item) => (item.id ?? item._id ?? item.name) === productId);

    const handleCurrentProduct = () => {
        dispatch(setCurrentProduct(product));
        onDetails?.();
        navigate('/details');
    }

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        onCart?.(product);
    }

    const handleToggleWishlist = () => {
        if (isWishlisted) {
            dispatch(removeFromWishlist(productId));
        } else {
            dispatch(addToWishlist(product));
        }
        onWishlist?.(product);
    }

    return (
    <ul className="d-flex align-items-center justify-content-center list-unstyled">
        <li className="icon">
            <button className="action-btn" type="button" onClick={handleCurrentProduct} to={{pathname: '/details/'}} aria-label="View product details">
                <span aria-hidden="true">⤢</span>
            </button>
        </li>
        <li className="icon mx-3">
            <button className={`action-btn wishlist-action ${isWishlisted ? 'wishlist-action-active' : ''}`} type="button" onClick={handleToggleWishlist} aria-label={isWishlisted ? 'Remove product from wishlist' : 'Add product to wishlist'} aria-pressed={isWishlisted}>
                <span aria-hidden="true">{isWishlisted ? '♥' : '♡'}</span>
            </button>
        </li>
        <li className="icon">
            <button className="action-btn" type="button" onClick={handleAddToCart} aria-label="Add product to cart">
                <span aria-hidden="true">🛒</span>
            </button>
        </li>
    </ul>)

}

export default IconList