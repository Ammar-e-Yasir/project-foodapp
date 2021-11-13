// import React, { useContext,useEffect, useState } from "react";
// import { collection, query, where, db, getDocs } from "../../configs/firebase";
// import { GlobalContext } from "../../context/context";

// export default function CustDeliveredOrders() {
//     const { state } = useContext(GlobalContext);
//     const [orderDelivered, setDeliveredOrders] = useState([]);

//     useEffect(async () => {

//         try {
//             const q = query(collection(db, "ordersDelivered"), where("custID", "==", state.authUser.uid));

//             const querySnapshot = await getDocs(q);
//             let orderDeliveredClone = orderDelivered.slice(0);
//             querySnapshot.forEach((doc) => {
//                 let obj = doc.data();
//                 obj.id = doc.id;
//                 orderDeliveredClone.push(obj)

//             });
//             setDeliveredOrders(orderDeliveredClone)
//         }
//         catch (e) {
//             console.log(e)
//         }

//     }, [state.authUser])



//     return (
//         <div className='pt-3'>
//             <h1 className='text-center'>Delivered Orders</h1>
//             <div className='container d-flex flex-wrap justify-content-around border' style={{backgroundColor:'#d5e0d7'}} >

//                 {orderDelivered.map(({ foodname, foodImg, category, price, custID, id }, index) => {
//                     return (


//                         <div className='col-4' id={id} key={index} style={{width:'20rem'}}>
//                             <div className="card m-4 shadow ">
//                                 <img className="card-img-top" src={foodImg} alt="Card image cap" height='300px' />
//                                 <div className="card-body">
//                                     <h2 className="card-title">{foodname}</h2>
//                                     <p className="card-text">{category}</p>
//                                     <p className="card-text">Rs. {price}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     )

//                 })
//                 }


//             </div>
//         </div>

//     )
// }