import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ProductSection, { getCategoryProducts } from '../components/ProductSection'
import Footer from '../components/Footer'
import { fetchProducts } from '../services/api'

function Kids() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(getCategoryProducts(fetchedProducts, 'kids'));
      } catch (error) {
        console.error('Failed to load kids products:', error);
      }
    };

    loadProducts();
  }, [])

  return (
    <div>
      <Navbar/>
      <ProductSection title="Kids Collection" products={products} />
      <Footer/> 
    </div>
  )
}

export default Kids