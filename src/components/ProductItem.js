import React from 'react'
import IconList from './IconList'

function ProductItem({ product = {}, onDetails, onWishlist, onCart }) {
  const { image, name = 'Product', price, rating = 5, sale = true, category, stock, description } = product

  return (
    <article className="product-card h-100">
      <div className="product-image-wrap">
        <div className="product-badges">
          {sale && <span className="product-sale">SALE</span>}
          {category && <span className="product-category">{category}</span>}
        </div>
        <img src={image} className="product-image" alt={name} />
        <div className="product-actions">
          <IconList
            product={product}
            onDetails={() => onDetails?.(product)}
            onWishlist={() => onWishlist?.(product)}
            onCart={() => onCart?.(product)}
          />
        </div>
      </div>
      <div className="product-info">
        <div className="product-heading-row">
          <h3 className="product-name">{name}</h3>
          {stock !== undefined && <span className={`product-stock ${Number(stock) > 0 ? '' : 'out-of-stock'}`}>{Number(stock) > 0 ? 'In stock' : 'Sold out'}</span>}
        </div>
        <div className="product-rating" aria-label={`${rating} out of 5 stars`}>
          {'★'.repeat(Math.max(0, Math.min(5, rating)))}
        </div>
        {description && <p className="product-description">{description}</p>}
        {price !== undefined && <p className="product-price">₹ {Number(price).toFixed(2)}</p>}
      </div>
    </article>
  )
}

export default ProductItem