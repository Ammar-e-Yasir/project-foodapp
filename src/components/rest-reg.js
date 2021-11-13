import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, db, setDoc, doc, } from '../configs/firebase';


function RestaurantReg() {
    let history = useHistory();

    const [resname, setResName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [errMsg, setErrMsg] = useState('');


    const register = async () => {

        try {
            let { user } = await createUserWithEmailAndPassword(auth, email, password);
            let dataRef = doc(db, 'users', user.uid);
            await setDoc(dataRef, {
                res_name: resname,
                email: user.email,
                country: country,
                city: city,
                userRole: 'restaurant',
                uid: user.uid
            });

            history.push('/')


        }

        catch (err) {
            console.log(err.message)

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
        <div className='rest-reg'>
            <div className='container d-flex justify-content-center align-items-center' style={{ height: '99vh' }}>


                <div className='col-12 box p-4'>
                    <h1 className='text-light text-center py-2' style={{ backgroundColor: '#802829' }}>Restaurant Registration</h1>
                    {errMsg ? <p className=" alert alert-danger">{errMsg}</p> : null}

                    <div className="form-group py-2">
                        <input type="text" className="form-control shadow-none" placeholder='Restaurant Name' aria-describedby="emailHelp" value={resname} onChange={(ev) => { setResName(ev.target.value) }} />
                    </div>
                    <div className="form-group py-2">
                        <input type="email" className="form-control shadow-none" placeholder='Email' aria-describedby="emailHelp" value={email} onChange={(ev) => { setEmail(ev.target.value) }} />
                    </div>
                    <div className="form-group py-2">
                        <input type="password" className="form-control shadow-none" placeholder='Password' value={password} onChange={(ev) => { setPassword(ev.target.value) }} />

                    </div>
                    <div className="form-group py-2">
                        <input type="text" className="form-control shadow-none" placeholder='Country' value={country} onChange={(ev) => { setCountry(ev.target.value) }} />

                    </div>
                    <div className="form-group py-2">
                        <input type="text" className="form-control shadow-none" placeholder='City' value={city} onChange={(ev) => { setCity(ev.target.value) }} />

                    </div>

                    <button className="btn btn-outline-success mt-4 shadow-none w-100" onClick={() => {
                        if (resname != '' && email != '' && password != '' && country != '' && city != '') {
                            register();
                        }
                        else {
                            setErrMsg('required all field value !')
                            setTimeout(() => {
                                setErrMsg('')
                            }, 2000)
                        }
                    }}>

                        Register</button>
                    <p className='text-center mt-3'>Already have an account ? <Link to='/'>Signin</Link></p>
                </div>


            </div>
        </div>
    )
}

export default RestaurantReg;