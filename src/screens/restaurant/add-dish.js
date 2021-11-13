import React, { useContext, useState } from "react";
import { storage, ref, uploadBytes, getDownloadURL, db, addDoc, collection } from "../../configs/firebase";
import { GlobalContext } from "../../context/context";

export default function AddDish() {
    const { state } = useContext(GlobalContext);
    const [dishImg, setDishImg] = useState('');
    const [foodname, setFoodName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [delivery, setDelivery] = useState('');
    const [errMsg, setErrMsg] = useState('');

    // console.log(category)

    const selectCountry = (e) =>{
        // console.log(category)
        setCategory(e);
        document.getElementById('countrySelect').innerText = e;

    }
    async function addDish() {
        try {
            const storageRef = ref(storage, `images/${state.authUser.uid}/${dishImg.name}`);
            await uploadBytes(storageRef, dishImg);
            let imgURL = await getDownloadURL(ref(storage, `images/${state.authUser.uid}/${dishImg.name}`));

            let dish = {
                foodImg: imgURL,
                foodname,
                price,
                category,
                delivery,
                uid: state.authUser.uid
            }
            let docRef = await addDoc(collection(db, 'dishes'), dish);
            alert('Dish Add Successfully !')

            setDishImg('')
            setFoodName('')
            setPrice('')
            setCategory('')
            setDelivery('')
            document.getElementById('countrySelect').innerText = 'Select Category';
        }
        catch (e) {
            console.log(e)

        }
    }
    return (
        <div className='add-dish'>
            <div className='container d-flex justify-content-center align-items-center' style={{ height: '99vh' }}>


                <div className='col-12 box p-4'>
                    <div className="form-group py-2">
                        <h1 className='text-light text-center py-2' style={{ backgroundColor: '#802829' }}>Add Dish !</h1>
                    </div>
                    {errMsg ? <p className=" alert alert-danger">{errMsg}</p> : null}

                    <div className="text-center p-4 border">



                        <label>
                            <input type="file" placeholder='asd' onChange={(e) => { setDishImg(e.target.files[0]) }} />
                        </label>
                    </div>
                    <div className="form-group py-2">
                        <input type="text" className="form-control shadow-none" placeholder='Item Name' aria-describedby="emailHelp" value={foodname} onChange={(ev) => { setFoodName(ev.target.value) }} />
                    </div>
                    <div className="form-group py-2">
                        <input type="number" className="form-control shadow-none" placeholder='Price' aria-describedby="emailHelp" value={price} onChange={(ev) => { setPrice(ev.target.value) }} />
                    </div>
                    {/* <div className="form-group py-2">
                        <input type="text" className="form-control shadow-none" placeholder='Category' value={category} onChange={(ev) => { setCategory(ev.target.value) }} />

                    </div> */}
                    <div className="btn-group">
                  
                       <button className="btn btn-secondary dropdown-toggle shadow-none my-4" type="button" id="countrySelect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Category
                        </button>
                        <div className="dropdown-menu"aria-labelledby="dropdownMenu2" >
                            <button className="dropdown-item" type="button" onClick={(e)=>{selectCountry(e.target.innerText)} }>Chinees</button>
                            <button className="dropdown-item" type="button" onClick={(e)=>{selectCountry(e.target.innerText)} }>Pakistani</button>
                            <button className="dropdown-item" type="button" onClick={(e)=>{selectCountry(e.target.innerText)} }>Turkish</button>
                            <button className="dropdown-item" type="button" onClick={(e)=>{selectCountry(e.target.innerText)} }>Arabian</button>
                        </div>
                    </div>

                    
                    <div className="form-group py-2">
                        <input type="text" className="form-control shadow-none" placeholder='Delivery' value={delivery} onChange={(ev) => { setDelivery(ev.target.value) }} />

                    </div>


                    <button className="btn btn-outline-danger w-100 mt-4 shadow-none" onClick={() => {
                        if (dishImg !== '' && foodname !== '' && price !== '' && category !== '' && delivery !== '') {
                            addDish();
                        }
                        else {
                            setErrMsg('input field value empty !')
                            setTimeout(() => { setErrMsg('') }, 2000)
                        }
                    }}>Add</button>
                </div>


            </div>

        </div>

    )
}


