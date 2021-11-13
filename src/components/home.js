import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
    return (

        <div className='home'>
        <div className='container d-flex justify-content-center align-items-center' style={{height:'99vh'}}>


            <div className='col-12 p-3 box'>
                <h1 className='text-white text-center rounded  py-2' style={{backgroundColor:'#802829'}}>Register</h1>
                <Link to='/rest-reg'><button className="btn btn-outline-warning shadow-none mt-4 w-100">Restaurant</button></Link>
                <Link to='/cust-reg'><button className="btn btn-outline-secondary shadow-none mt-4 w-100">Customer</button></Link>
                <p className='text-center mt-4'>Already have an account ! <Link to='/'> signin here</Link></p>
            </div>


        </div>

        </div>
    )
}