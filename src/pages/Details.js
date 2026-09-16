import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductDetails from '../components/ProductDetails'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Details() {
  const product = useSelector((state) => state.currentProduct)

  if (!product || !product.image) {
    return (
      <div className='container-fluid'> 
        <Navbar/>
        <h1>Product details</h1>
        <p>No product has been selected.</p>
        <Link to="/">Back to products</Link>
        <Footer/> 
      </div>
    )
  }

  return (
    <div className='container-fluid'>
        <Navbar/>
        <ProductDetails product={product}/>
        <Footer/>
    </div>
  )
}

export default Details
