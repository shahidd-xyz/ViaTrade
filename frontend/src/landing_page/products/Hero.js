import React from 'react';

function Hero() {
    return ( 
        <div className="container text-center border-bottom mb-5 pb-5">
            <div className='text-center mt-5 p-3'>
            <h2>Our Products</h2>
            <h4 className='text-muted mt-3 fs-4'>Sleek, modern and intuitive trading platforms</h4>
            <p className='mt-3' style={{fontSize: "1.1rem"}}>Check out our <a href="https://viatrade-dashboard.vercel.app/signup" style={{textDecoration: "none"}}>investment offerings <i class="fa-solid fa-arrow-right"></i></a></p>
            </div>
        </div>
     );
}

export default Hero;