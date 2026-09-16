import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import ProductSection, { getFeaturedProducts } from '../components/ProductSection'
import Footer from '../components/Footer'
import { fetchProducts } from '../services/api'

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(getFeaturedProducts(fetchedProducts, 8));
      } catch (error) {
        console.error('Failed to load featured products:', error);
      }
    };

    loadProducts();
  }, [])

  return (
    <div className='container-fluid'>
      <Navbar/>
      <Carousel/>
      <ProductSection title="Featured Products" products={products} />
      <Footer/> 
    </div>
  )
}

export default Home