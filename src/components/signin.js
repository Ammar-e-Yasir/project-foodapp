import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../configs/firebase';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    let history = useHistory();
    const login = async () => {

        try {
            let a = await signInWithEmailAndPassword(auth, email, password);

        }

        catch (err) {
            console.log(err.message);


            switch (err.message) {
                case 'Firebase: Error (auth/invalid-email).':
                    setErrMsg('Invalid Email !');
                    break;
                case 'Firebase: Error (auth/wrong-password).':
                    setErrMsg('Incorrect Password !');
                    break;
            
            }
            setTimeout(() => { setErrMsg('') }, 2000)

        }
    }

    return (
        <div className='main'>

            <div className='container d-flex justify-content-center align-items-center' style={{ height: '99vh' }}>


                <div className='col-12 box p-4'>
                    <h1 className='text-light text-center py-2' style={{ backgroundColor: '#802829' }}>Login</h1>

                    {errMsg ? <p className="form-text alert alert-danger">{errMsg}</p> : null}

                    <div className="form-group py-2">
                        <input type="email" className="form-control shadow-none" placeholder='Email' aria-describedby="emailHelp" value={email} onChange={(ev) => { setEmail(ev.target.value) }} />
                    </div>
                    <div className="form-group py-2">
                        <input type="password" className="form-control shadow-none" placeholder='Password' value={password} onChange={(ev) => { setPassword(ev.target.value) }} />

                    </div>
                    <hr className='' />
                    <div className='form-group py-2'>

                        <button className="btn btn-warning shadow-none w-100" onClick={() => {
                            if (email !== '' && password !== '') {
                                login();
                            }
                            else {
                                setErrMsg('Enter email & password !')
                                setTimeout(() => { setErrMsg('') }, 2000)
                            }
                        }}>Login</button>
                        <p className='pt-3'>Don't have an account ? <Link to='/home' className='text-decoration-none'>create account</Link></p>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default SignIn;





