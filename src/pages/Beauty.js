import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ProductSection, { getCategoryProducts } from '../components/ProductSection'
import Footer from '../components/Footer'
import { fetchProducts } from '../services/api'

function Beauty() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(getCategoryProducts(fetchedProducts, 'beauty'));
      } catch (error) {
        console.error('Failed to load beauty products:', error);
      }
    };

    loadProducts();
  }, [])

  return (
    <div>
      <Navbar/>
      <ProductSection title="Beauty Essentials" products={products} />
      <Footer/> 
    </div>
  )
}

export default Beauty