import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useHistory } from 'react-router';
import { auth, createUserWithEmailAndPassword, db, setDoc, doc, } from '../configs/firebase';


function CustomerReg() {
    let history = useHistory();
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [errMsg, setErrMsg] = useState('');


    const register = async () => {

        try {
            let { user } = await createUserWithEmailAndPassword(auth, email, password);
            let dataRef = doc(db, 'users', user.uid);
            await setDoc(dataRef, {
                cust_name: username,
                email: user.email,
                number: number,
                country: country,
                city: city,
                userRole: 'customer',
                uid: user.uid,
            });
            history.push('/')

        }

        catch (err) {
            // console.log(err.message)
           
            switch (err.message) {
                case 'Firebase: Error (auth/invalid-email).':
                    setErrMsg('Invalid Email !');
                    break;

                case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
                    setErrMsg('password should be at least 6 characters');
                    break;

                case 'Firebase: Error (auth/email-already-in-use).':
                    setErrMsg('Email already in use !');
                    break;
            }
            setTimeout(() => { setErrMsg('') }, 2000)
        }
    }

        

    return (
        <div className='cust-reg'>
        <div  className='container d-flex justify-content-center align-items-center' style={{height:'99vh'}}>


            <div className='col-12 box p-4'>
                    <h1 className='text-light text-center py-2' style={{backgroundColor:'#802829'}}>Customer Registration</h1>
                    {errMsg ? <p className="text-danger alert alert-danger " >{errMsg}</p> : null}
                <div className="form-group py-2">

                    <input type="text" className="form-control shadow-none" placeholder='Name' aria-describedby="emailHelp" value={username} onChange={(ev) => { setUserName(ev.target.value) }} />
                </div>
                <div className="form-group py-2">
                    <input type="email" className="form-control shadow-none" placeholder='Email' aria-describedby="emailHelp" value={email} onChange={(ev) => { setEmail(ev.target.value) }} />
                </div>
                <div className="form-group py-2">
                    <input type="password" className="form-control shadow-none" placeholder='Password' value={password} onChange={(ev) => { setPassword(ev.target.value) }} />

                </div>
                <div className="form-group py-2">
                    <input type="number" className="form-control shadow-none" placeholder='Phone Number' value={number} onChange={(ev) => { setNumber(ev.target.value) }} />

                </div>
                <div className="form-group py-2">
                    <input type="text" className="form-control shadow-none" placeholder='Country' value={country} onChange={(ev) => { setCountry(ev.target.value) }} />
                    {errMsg ? <small className="form-text text-muted">{errMsg}</small> : null}
                    
                </div>

                <div className="form-group py-2">
                    <input type="text" className="form-control shadow-none" placeholder='City' value={city} onChange={(ev) => { setCity(ev.target.value) }} />

                </div>

                <button className="btn btn-outline-success mt-4 shadow-none w-100" onClick={() => {
                    if (username != '' && email != '' && password != '' && number != '' && country != '' && city != '') {
                        register();
                    }
                    else {
                        setErrMsg('All field are required !');
                        setTimeout(() => {
                            setErrMsg('');
                        }, 2000)
                    }
                }}>Register</button>
                <p className='text-center mt-3'>Already have an account ? <Link to='/'>Signin</Link></p>
            </div>


        </div>

        </div>
    )
}

export default CustomerReg;