import React from 'react'
import bannerImage1 from '../images/B1.png'
import bannerImage2 from '../images/B2.png'
import bannerImage3 from '../images/B3.png'

function Carousel() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide">
    <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div className="carousel-inner">
        <div className="carousel-item active">
        <img style={{height:"80vh"}} src={bannerImage1} className="d-block w-100" alt="Banner"/>
        </div>
        <div className="carousel-item">
        <img style={{height:"80vh"}} src={bannerImage2} className="d-block w-100" alt="..."/>
        </div>
        <div className="carousel-item">
        <img style={{height:"80vh"}} src={bannerImage3} className="d-block w-100" alt="..."/>
        </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
</div>
  )
}

export default Carousel