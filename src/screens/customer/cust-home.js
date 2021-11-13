import React, { useContext, useEffect, useState } from "react";
import { db, collection, where, query, onSnapshot } from '../../configs/firebase'
import { GlobalContext } from "../../context/context";
import { useHistory } from "react-router";


export default function CustomerHome() {
    const { state, dispatch } = useContext(GlobalContext);
    const [allRestaurant, setAllRestaurant] = useState([]);

    let history = useHistory();


    useEffect(async () => {


        const q = query(collection(db, "users"), where("userRole", "==", 'restaurant'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let allRestaurantClone = allRestaurant.slice(0);
            querySnapshot.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                allRestaurantClone.push(obj);
            });
            setAllRestaurant(allRestaurantClone)
        });

    }, [])

    const selectRest = (e) => {
        let restID = e.target.parentNode.parentNode.parentNode.id;
        //    dispatch({type:"SELECT_RES_ID" , payload:restID});
        localStorage.setItem('restId', restID)
        history.push('/rest-dish')
        //    console.log(restID)
    }


    return (
        <div>
            <div className='container' style={{ backgroundColor: '#dcdedd' }}>
                <h1 className='text-center  pt-3'> Select your Restaurant !</h1>
                {allRestaurant.map(({ res_name, country, city, id }, index) => {
                    return (

                        <div className='col-12 border ' id={id} key={index}>
                            <div className="card m-4  shadow">
                                <div className="card-body m-4" >
                                    <h2 className="card-title text-success">{res_name}</h2>
                                    <h4 className="card-text">Country _ {country}</h4>
                                    <h4 className="card-text">City_ {city}</h4>
                                    <button className='btn btn-success mt-4' onClick={selectRest}>Explore</button>

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