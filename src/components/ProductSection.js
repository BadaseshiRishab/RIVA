import React from 'react'
import ProductItem from './ProductItem'

const productsData = [
  {
    id: 1,
    name: 'Classic Leather Backpack',
    price: '109.95',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    description: 'A practical everyday backpack with a padded laptop sleeve and durable, travel-ready design.'
  },
  {
    id: 2,
    name: 'Urban Street Tee',
    price: '22.30',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    description: 'A soft cotton T-shirt with a clean casual fit for regular daily wear.'
  },
  {
    id: 3,
    name: 'Classic Bomber Jacket',
    price: '55.99',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    description: 'Lightweight layering essential designed for cool evenings and effortless styling.'
  },
  {
    id: 4,
    name: 'Essential Slim Fit Shirt',
    price: '15.99',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    description: 'A versatile slim-fit shirt for smart-casual looks and all-day ease.'
  },
  {
    id: 5,
    name: 'Weekend Travel Tote',
    price: '39.00',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
    description: 'Roomy and easy to carry with a polished silhouette for work or weekends.'
  },
  {
    id: 6,
    name: 'Premium Knit Polo',
    price: '49.50',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
    description: 'Tailored comfort with a premium knit finish for relaxed polished looks.'
  },
  {
    id: 7,
    name: 'Canvas Everyday Sneakers',
    price: '67.90',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80',
    description: 'Comfort-first sneakers built for walking, commuting, and weekend plans.'
  },
  {
    id: 8,
    name: 'Luxe Wool Scarf',
    price: '26.00',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    description: 'Soft, warm, and easy to layer for cooler days and elevated outfits.'
  }
]

const productsmenData = [
  {
    id: 1,
    name: 'Heritage Leather Backpack',
    price: '1449.99',
    rating: 5,
    description: 'A structured leather backpack with a refined look and roomy everyday compartments.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Signature Cotton Polo',
    price: '599.99',
    rating: 5,
    description: 'A breathable premium knit polo that balances comfort and smart styling.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Layered Utility Jacket',
    price: '55.99',
    rating: 5,
    description: 'A versatile utility jacket with a lightweight feel and timeless silhouette.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Modern Slim Fit Shirt',
    price: '15.99',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Trail Running Cap',
    price: '18.50',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Everyday Denim',
    price: '58.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    name: 'Weekend Leather Watch',
    price: '129.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    name: 'City Commute Backpack',
    price: '89.00',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 9,
    name: 'Summit Wool Overshirt',
    price: '98.50',
    rating: 5,
    description: 'A warm yet breathable overshirt for crisp mornings and layered looks.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 10,
    name: 'Metro Runner Sneaker',
    price: '74.00',
    rating: 5,
    description: 'Built for everyday miles with soft cushioning and a clean finish.',
    image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80'
  }
]

const productswomenData = [
  {
    id: 1,
    name: 'Vivid Daypack',
    price: '109.95',
    rating: 5,
    description: 'A dependable backpack with practical storage and a polished everyday silhouette.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Soft Knit Top',
    price: '22.30',
    rating: 5,
    description: 'A soft, easy-fitting top made for all-day comfort and effortless styling.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Classic Trench Coat',
    price: '55.99',
    rating: 5,
    description: 'A refined trench layer that sharpens everyday looks without feeling heavy.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Sculpted Everyday Dress',
    price: '15.99',
    rating: 5,
    description: 'A clean, flattering dress that transitions easily from day to night.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Mini Crossbody',
    price: '42.00',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Relaxed Pleat Trouser',
    price: '49.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    name: 'Statement Sunglasses',
    price: '31.00',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1577803947579-9f7e1c8a3d80?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    name: 'Soft Knit Cardigan',
    price: '63.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 9,
    name: 'Sunset Silk Dress',
    price: '87.00',
    rating: 5,
    description: 'An effortlessly elegant silhouette for dinners, events, and afternoon plans.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 10,
    name: 'Cloud Knit Cardigan',
    price: '74.00',
    rating: 5,
    description: 'A brushed knit layer that keeps style relaxed and cozy throughout the day.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80'
  }
]

const productsKidsData = [
  {
    id: 1,
    name: 'Adventure Backpack',
    price: '34.99',
    rating: 5,
    description: 'A cheerful and durable backpack for school, day trips, and playtime.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Playful Graphic Tee',
    price: '18.50',
    rating: 5,
    description: 'Bright, comfortable, and easy to wear for all-day movement.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Cotton Zip Hoodie',
    price: '29.99',
    rating: 5,
    description: 'Soft fleece interior and an easy fit designed for comfort and warmth.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Kids Rain Shell',
    price: '42.00',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Junior Sneaker Pair',
    price: '36.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Storybook Set',
    price: '24.00',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    name: 'Soft Plush Toy',
    price: '19.99',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    name: 'Play Mat',
    price: '58.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 9,
    name: 'Dino Explorer Backpack',
    price: '39.50',
    rating: 5,
    description: 'A durable, playful daypack with room for lunch, art supplies, and extras.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 10,
    name: 'Build & Play Blocks',
    price: '26.00',
    rating: 5,
    description: 'A colorful building set designed for creative play and gentle learning.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80'
  }
]

const productsBeautyData = [
  {
    id: 1,
    name: 'Glow Serum',
    price: '28.00',
    rating: 5,
    description: 'A lightweight serum that hydrates and brings a fresh, healthy glow.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Silk Face Cream',
    price: '32.50',
    rating: 5,
    description: 'Daily nourishment with a smooth finish and rich hydration.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Soft Cleanser',
    price: '21.00',
    rating: 4,
    description: 'A gentle formula that refreshes skin without over-drying.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Hydrating Mist',
    price: '19.80',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Tinted Lip Balm',
    price: '16.30',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Velvet Body Oil',
    price: '27.90',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    name: 'Rose Water Toner',
    price: '23.40',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    name: 'Night Repair Mask',
    price: '35.50',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 9,
    name: 'Citrus Glow Scrub',
    price: '24.90',
    rating: 5,
    description: 'A brightening exfoliator that smooths and revives tired skin.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 10,
    name: 'Dewy Eye Serum',
    price: '29.50',
    rating: 5,
    description: 'Refines the eye area with a cushiony, lightweight finish.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80'
  }
]

const productsLivingData = [
  {
    id: 1,
    name: 'Minimal Accent Chair',
    price: '230.00',
    rating: 5,
    description: 'A statement chair with a clean silhouette for modern, restful spaces.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Soft Throw Blanket',
    price: '58.00',
    rating: 5,
    description: 'An ultra-soft layer that adds warmth and texture to any room.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Tabletop Aroma Diffuser',
    price: '44.00',
    rating: 4,
    description: 'A subtle home accent that brings aroma and calm to everyday routines.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Natural Woven Basket',
    price: '33.50',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Linen Cushion Set',
    price: '39.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Wooden Wall Shelf',
    price: '72.00',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    name: 'Ceramic Table Lamp',
    price: '61.50',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    name: 'Indoor Plant Pot',
    price: '28.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 9,
    name: 'Round Coffee Table',
    price: '180.00',
    rating: 5,
    description: 'A refined centerpiece for living rooms with a modern yet warm aesthetic.',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 10,
    name: 'Storage Bench',
    price: '96.00',
    rating: 5,
    description: 'A smart blend of form and function for clutter-free living spaces.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
  }
]

const specificationsByProduct = {
  'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops': {
    care: 'Spot clean with a damp cloth',
    fit: 'Adjustable backpack fit',
    color: 'Brown',
    material: 'Polyester and leather trim',
    pattern: 'Solid'
  },
  'Mens Casual Premium Slim Fit T-Shirts': {
    care: 'Machine wash cold',
    fit: 'Slim Fit',
    color: 'Black',
    material: 'Cotton',
    pattern: 'Solid'
  },
  'Mens Cotton Jacket': {
    care: 'Machine wash gentle cycle',
    fit: 'Regular Fit',
    color: 'Blue',
    material: 'Cotton',
    pattern: 'Solid'
  },
  'Mens Casual Slim Fit': {
    care: 'Machine wash cold',
    fit: 'Slim Fit',
    color: 'Black',
    material: 'Cotton blend',
    pattern: 'Solid'
  }
}

const addSpecifications = (catalog) => catalog.map((product) => ({
  ...product,
  specifications: specificationsByProduct[product.name]
}))

export const normalizeProduct = (product = {}) => {
  const normalized = {
    ...product,
    id: product.id ?? product._id ?? product.name,
    name: product.name || 'Product name',
    description: product.description || 'A product you will love.',
    price: String(product.price ?? 0),
    rating: Number(product.rating ?? 5),
    image: product.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    category: (product.category || 'general').toString().toLowerCase(),
  };

  normalized.specifications = product.specifications || specificationsByProduct[normalized.name] || {
    care: 'Follow the care label instructions',
    fit: 'Regular Fit',
    color: 'Black',
    material: 'Cotton blend',
    pattern: 'Solid',
  };

  return normalized;
};

export const getCategoryProducts = (catalog = [], category = 'all') => {
  const normalized = (catalog || []).map(normalizeProduct);

  if (!category || category === 'all') {
    return normalized;
  }

  return normalized.filter((product) => {
    const productCategory = String(product.category || '').toLowerCase();
    return productCategory === String(category).toLowerCase();
  });
};

export const getFeaturedProducts = (catalog = [], limit = 8) => {
  return (catalog || []).map(normalizeProduct).filter((product) => product.featured !== false).slice(0, limit);
};

export const products = addSpecifications(productsData)
export const productsmen = addSpecifications(productsmenData)
export const productswomen = addSpecifications(productswomenData)
export const productskids = addSpecifications(productsKidsData)
export const productsbeauty = addSpecifications(productsBeautyData)
export const productsliving = addSpecifications(productsLivingData)

export const fallbackProducts = [
  ...productsmen.map((product) => ({ ...product, category: 'men' })),
  ...productswomen.map((product) => ({ ...product, category: 'women' })),
  ...productskids.map((product) => ({ ...product, category: 'kids' })),
  ...productsbeauty.map((product) => ({ ...product, category: 'beauty' })),
  ...productsliving.map((product) => ({ ...product, category: 'living' })),
]

function ProductSection({ title = 'Products', products = [], ...handlers }) {
  const normalizedProducts = (products || []).map(normalizeProduct);

  return (
    <section className="product-section" aria-labelledby="product-section-title">
      <h2 id="product-section-title" className="product-section-title">{title}</h2>
      <div className="row g-4">
        {normalizedProducts.map((product, index) => (
          <div className="col-12 col-sm-6 col-lg-3" key={product.id ?? product.name ?? index}>
            <ProductItem product={product} {...handlers} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductSection