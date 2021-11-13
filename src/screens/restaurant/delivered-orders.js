import React, { useContext, useEffect, useState } from "react";
import { db, collection, where, query, onSnapshot } from '../../configs/firebase';
import { GlobalContext } from "../../context/context";

export default function CustDeliveredOrders() {
    const [deliveredOrders, setDeliveredOrders] = useState([]);


    const { state, dispatch } = useContext(GlobalContext);


    useEffect(async () => {
        try {

            const q = query(collection(db, "ordersDelivered"), where("uid", "==", state.authUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let deliveredOrdersClone = deliveredOrders.slice(0);
                querySnapshot.forEach((doc) => {
                    let obj = doc.data();
                    obj.id = doc.id;
                    deliveredOrdersClone.push(obj);
                });
                setDeliveredOrders(deliveredOrdersClone);
            });
        }
        catch (e) {
            console.log(e)
        }

    }, [])




    return (
        <div className='pt-3'>
            <h1 className='text-center'>Delivered Orders</h1>
            <div className='container d-flex flex-wrap justify-content-around border' style={{ backgroundColor: '#d5e0d7' }}  >

                {deliveredOrders.map(({ foodname, foodImg, category, price, custID, id }, index) => {
                    return (

                        <div className='col-4 py-4' id={id} key={index} style={{ width: '20rem' }}>
                            <div className="card m-4  shadow">
                                <img className="card-img-top" src={foodImg} alt="Card image cap" height='230px' />
                                <div className="card-body">
                                    <h2 className="card-title">{foodname}</h2>
                                    <p className="card-text">{category}</p>
                                    <p className="card-text">Rs. {price}</p>
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