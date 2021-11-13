import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../context/context";
import { db, collection, where, query, doc, addDoc, getDoc, onSnapshot } from '../../configs/firebase'


export default function RestDishes() {

    const { state } = useContext(GlobalContext);
    const [allDishes, setAllDish] = useState([]);
    let uid = localStorage.getItem("restId");


    useEffect(async () => {
        try {

            const q = query(collection(db, "dishes"), where("uid", "==", uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let allDishClone = allDishes.slice(0);
                querySnapshot.forEach((doc) => {
                    let obj = doc.data();
                    obj.id = doc.id;
                    allDishClone.push(obj);
                });
                setAllDish(allDishClone)
            });
        }

        catch (e) {
            console.log(e)
        }


    }, []);


    const orderItem = async (element) => {
        let a = doc(db, "dishes", element.id);
        let b = await getDoc(a);
        // console.log(b.data())
        let obj = b.data();
        obj.custID = state.authUser.uid;

        let orderRef = collection(db, 'orders');
        await addDoc(orderRef, obj)


        alert('Order has been done !')



    }
    return (
        <div className='pt-3'>
            <h1 className='text-center '>Our Food</h1>
            <div className='container d-flex flex-wrap justify-content-around border' style={{ backgroundColor: '#d5e0d7' }}  >
                {allDishes.map(({ foodname, foodImg, category, delivery, price, id }, index) => {

                    return (
                        <div className='col-4 py-4' id={id} key={index} style={{ width: '20rem' }}>
                            <div className="card m-2 shadow ">
                                <img className="card-img-top" src={foodImg} alt="Card image cap" height='250px' />
                                <div className="card-body">
                                    <h1 className="card-text">{category}</h1>
                                    <h5 className="card-title">{foodname}</h5>
                                    <h5 className="card-text">Price {price}</h5>
                                    <h5 className="card-text">Delivery : {delivery}</h5>
                                    <button className='btn btn-success shadow none mt-2' onClick={(e) => { orderItem(e.target.parentNode.parentNode.parentNode) }}>Order</button>
                                </div>
                            </div>
                        </div>

                    )
                })
                }
            </div>
        </div>
    )
}