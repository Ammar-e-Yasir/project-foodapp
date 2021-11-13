// import React, { useContext, useState } from "react";
// import { useEffect } from "react";
// import { collection, query, where, db, getDocs } from "../../configs/firebase";
// import { GlobalContext } from "../../context/context";

// export default function CustAcceptOrders() {
//     const { state } = useContext(GlobalContext);
//     const [ordersAccepted, setAcceptedOrders] = useState([]);

//     useEffect(async () => {



//         try {

//             const q = query(collection(db, "ordersAccepted"), where("custID", "==", state.authUser.uid));

//             const querySnapshot = await getDocs(q);
//             let ordersAcceptedClone = ordersAccepted.slice(0);
//             querySnapshot.forEach((doc) => {
//                 let obj = doc.data();
//                 obj.id = doc.id;
//                 ordersAcceptedClone.push(obj)

//             });
//             setAcceptedOrders(ordersAcceptedClone)


//         }
//         catch (e) {
//             console.log(e)
//         }


//     }, [state.authUser])




//     return (
//         <div className='pt-3'>
//             <h1 className='text-center'>Acceptd Orders</h1>
//             <div className='container d-flex flex-wrap justify-content-around border' style={{backgroundColor:'#d5e0d7'}} >

//                 {ordersAccepted.map(({ foodname, foodImg, category, price,delivery, custID, id }, index) => {
//                     return (


//                         <div className='col-4' id={id} key={index} style={{width:'20rem'}}>
//                             <div className="card m-4 shadow">
//                                 <img className="card-img-top" src={foodImg} alt="Card image cap" height='300px' />
//                                 <div className="card-body">
//                                     <h2 className="card-title">{foodname}</h2>
//                                     <p className="card-text">{category}</p>
//                                     <p className="card-text">Rs. {price}</p>
//                                     <p className="card-text">{delivery}</p>
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
