import React, { useState, useEffect, useContext } from "react";
import { collection, query, where, db, getDocs } from "../../configs/firebase";
import { GlobalContext } from "../../context/context";

export default function OrderStatus() {
    const { state } = useContext(GlobalContext);
    const [ordersPending, setPendingOrders] = useState([]);
    const [ordersAccepted, setAcceptedOrders] = useState([]);
    const [ordersDelivered , setDeliveredOrders]= useState([]);




    useEffect(async () => {
        try {

            const q = query(collection(db, "orders"), where("custID", "==", state.authUser.uid));

            const querySnapshot = await getDocs(q);
            let ordersPendingClone = ordersPending.slice(0);
            querySnapshot.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                obj.status = 'Pending';
                ordersPendingClone.push(obj)

            });

            setPendingOrders(ordersPendingClone)
        }


        catch (e) {
            console.log(e)
        }




    }, [])


    useEffect(async () => {
        try {

            const q = query(collection(db, "ordersAccepted"), where("custID", "==", state.authUser.uid));

            const querySnapshot = await getDocs(q);
            let ordersAcceptedClone = ordersAccepted.slice(0);
            querySnapshot.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                obj.status = 'Accepted';
                ordersAcceptedClone.push(obj)

            });
            setAcceptedOrders(ordersAcceptedClone)
  }
        catch (e) {
            console.log(e)
        }


    }, [])


    useEffect(async () => {
        try {

            const q = query(collection(db, "ordersDelivered"), where("custID", "==", state.authUser.uid));

            const querySnapshot = await getDocs(q);
            let ordersDeliveredClone = ordersDelivered.slice(0);
            querySnapshot.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                obj.status = 'Delivered';
                ordersDeliveredClone.push(obj)

            });
            setDeliveredOrders(ordersDeliveredClone)
  }
        catch (e) {
            console.log(e)
        }


    }, [])


    return (
        <div className='pt-3'>
            <h1 className='text-center'>Order Status</h1>
            <div className='container d-flex justify-content-around flex-wrap border'  style={{backgroundColor:'#d5e0d7'}} >

                {ordersPending.map(({ foodname, foodImg, category, price,status, id }, index) => {
                    return (

                        <div className='col-4' id={id} key={index} style={{width:'20rem'}}>
                            <div className="card m-4 ">
                                <img className="card-img-top" src={foodImg} alt="Card image cap" height='250px' />
                                <div className="card-body">
                                    <h2 className="card-title">{foodname}</h2>
                                    <p className="card-text">{category}</p>
                                    <p className="card-text">Rs. {price}</p>
                                    <h3 className="card-text">Status : {status}</h3>
                                </div>
                            </div>
                        </div>
                    )

                })
                }


                {ordersAccepted.map(({ foodname, foodImg, category, price,status, id }, index) => {
                    return (


                        <div className='col-4' id={id} key={index}  style={{width:'20rem'}}>
                            <div className="card m-4 ">
                                <img className="card-img-top" src={foodImg} alt="Card image cap" height='250px' />
                                <div className="card-body">
                                    <h2 className="card-title">{foodname}</h2>
                                    <p className="card-text">{category}</p>
                                    <p className="card-text">Rs. {price}</p>
                                    <h3 className="card-text">Status : {status}</h3>
                                </div>
                            </div>
                        </div>
                    )

                })
                }
                {ordersDelivered.map(({ foodname, foodImg, category, price,status, id }, index) => {
                    return (


                        <div className='col-4' id={id} key={index}  style={{width:'20rem'}}>
                            <div className="card m-4 ">
                                <img className="card-img-top" src={foodImg} alt="Card image cap" height='250px' />
                                <div className="card-body">
                                    <h2 className="card-title">{foodname}</h2>
                                    <p className="card-text">{category}</p>
                                    <p className="card-text">Rs. {price}</p>
                                    <h3 className="card-text">Status : {status}</h3>
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
