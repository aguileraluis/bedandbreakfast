import { Link } from 'react-router-dom'
import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init({
    duration: 3000
});

function Landingscreen() {
  return (
    <div className='row landing justify-content-center'>

        <div className="col-md-9 my-auto text-center" style={{borderRight: '8px solid white'}}>

            <h3 data-aos="zoom-in" style={{color: 'white', fontSize: '160px'}}>Little Heaven</h3><h3 data-aos="zoom-in" style={{color: 'white', fontSize: '160px'}}>Bed & Breakfast</h3>
            <br/>
            <h1 data-aos="zoom-out"style={{color: 'white'}}>"There is only one boss. The Guest"</h1>
            <br/>

            <Link to='/home'>
                <button className='btn landingbtn' style={{color: 'black'}}>Get Started</button>
            </Link>
        </div>

    </div>
  )
}

export default Landingscreen