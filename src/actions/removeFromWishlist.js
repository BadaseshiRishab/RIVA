const removeFromWishlist = (productId) => ({
  type: 'REMOVE_FROM_WISHLIST',
  payload: productId,
});

export default removeFromWishlist;
