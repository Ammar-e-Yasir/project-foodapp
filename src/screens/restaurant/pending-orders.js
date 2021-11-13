import React, { useContext, useEffect, useState } from "react";
import { db, collection, where, query, addDoc, deleteDoc, doc, getDoc, onSnapshot } from '../../configs/firebase';
import { GlobalContext } from "../../context/context";

export default function PendingOrders() {

    const { state } = useContext(GlobalContext);
    const [pendingOrders, setAllPendingOrders] = useState([]);


    useEffect(async () => {
        try {
            const q = query(collection(db, "orders"), where("uid", "==", state.authUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let pendingOrdersClone = pendingOrders.slice(0);
                querySnapshot.forEach((doc) => {
                    let obj = doc.data();
                    obj.id = doc.id;
                    pendingOrdersClone.push(obj);
                });
                setAllPendingOrders(pendingOrdersClone)
            });
        }
        catch (e) {
            console.log(e)
        }

    }, [])


    const acceptedOrder = async (element) => {
        // console.log(element.id)
        try {
            let a = doc(db, "orders", element.id);
            let b = await getDoc(a);
            console.log(b.data())
            let obj = b.data();
            // obj.status = 'accepted' 



            let orderAccRef = collection(db, 'ordersAccepted');
            await addDoc(orderAccRef, obj);




            let docDel = doc(db, "orders", element.id);
            await deleteDoc(docDel);
        }
        catch (e) {
            console.log(e)
        }

        alert('You Accept Order !')




    }







    return (
        <div>
            <h1 className='text-center pt-3'>Pending Orders</h1>
            <div className='container border d-flex  justify-content-around flex-wrap' style={{ backgroundColor: '#d5e0d7' }} >
                {pendingOrders.map(({ foodname, foodImg, category, price, custID, id }, index) => {
                    return (
                        <div className="row py-4" id={id} key={index}>
                            <div className="col-sm">
                                <div className="card shadow " style={{ width: '18rem' }}>
                                    <img src={foodImg} className="card-img-top" height='220px' alt={foodname} />
                                    <div className="card-body">
                                        <h5 className="card-title">{foodname}</h5>
                                        <p className="card-text">{category}</p>
                                        <p className="card-text">{price}</p>
                                        <button className='btn btn-success shadow-none' onClick={(e) => { acceptedOrder(e.target.parentNode.parentNode.parentNode.parentNode) }}>Accept</button>

                                    </div>
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