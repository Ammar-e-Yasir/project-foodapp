import React, { useContext, useEffect, useState } from "react";
import { db, collection, where, query, addDoc, doc, deleteDoc, getDoc, onSnapshot } from '../../configs/firebase';
import { GlobalContext } from "../../context/context";

export default function AccedtedOrders() {
    const [acceptedOrders, setAcceptedOrders] = useState([]);


    const { state, dispatch } = useContext(GlobalContext);


    useEffect(async () => {
        try {

            const q = query(collection(db, "ordersAccepted"), where("uid", "==", state.authUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let acceptedOrdersClone = acceptedOrders.slice(0);
                querySnapshot.forEach((doc) => {
                    let obj = doc.data();
                    obj.id = doc.id;
                    acceptedOrdersClone.push(obj);
                });
                setAcceptedOrders(acceptedOrdersClone)
            });

        }
        catch (e) {
            console.log(e)
        }

    }, [state.authUser])


    const deliveredOrder = async (element) => {
        try {
            let a = doc(db, "ordersAccepted", element.id);
            let b = await getDoc(a);
            console.log(b.data())
            let obj = b.data();
            // obj.status='delivered';

            let orderDelivRef = collection(db, 'ordersDelivered');
            await addDoc(orderDelivRef, obj)


            let docDel = doc(db, "ordersAccepted", element.id);
            await deleteDoc(docDel);

            alert('Order Delivered !')
        }


        catch (e) {
            console.log(e)
        }

    }



    return (
        <div>
            <h1 className='text-center pt-3'>Accepted Orders</h1>
            <div className='container d-flex flex-wrap justify-content-around border' style={{ backgroundColor: '#d5e0d7' }} >

                {acceptedOrders.map(({ foodname, foodImg, category, price, custID, id }, index) => {
                    return (

                        <div className='col-4 py-4 ' id={id} key={index} style={{ width: '18rem' }}>
                            <div className="card shadow" >
                                <img className="card-img-top" src={foodImg} alt="Card image cap" height='300px' />
                                <div className="card-body">
                                    <h2 className="card-title">{foodname}</h2>
                                    <p className="card-text">{category}</p>
                                    <p className="card-text">Rs. {price}</p>
                                    <button className='btn btn-success shadow-none' onClick={(e) => { deliveredOrder(e.target.parentNode.parentNode.parentNode) }}>Delivered</button>
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