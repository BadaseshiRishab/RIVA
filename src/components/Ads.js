import React from 'react'

function Ads(props) {
  return (
    <div className="col-md-3 mt-3">
        <div className="card -w-100">
        <img style={{height:"20vh"}} src="https://imgs.search.brave.com/3Y64qkyjazrQJA8OMMWXjdlC_LY0HC2A-M6EKPp7Idc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM0/MDA4NzU2My9waG90/by9jb3NtZXRpYy1w/cm9kdWN0cy1pbi1t/b25vY2hyb21lLWJl/aWdlLWNvbG9yLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1V/MndTbzNReUdiOERp/Ny1JNVFLX3Jmdzlq/eVBlSFNScDVGX09T/am9mX0VZPQ" className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
            </div>
        </div>
    </div>
  )
}

export default Ads