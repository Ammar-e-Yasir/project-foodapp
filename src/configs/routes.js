import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../context/context";
import { useHistory } from "react-router";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SignIn from '../components/signin';
import { auth, onAuthStateChanged, db, doc, getDoc } from './firebase';
import Nav from "../components/navbar"
import CustomerReg from "../components/cust-register";
import RestaurantReg from "../components/rest-reg";
import Home from "../components/home";
import CustomerHome from "../screens/customer/cust-home";
import AddDish from '../screens/restaurant/add-dish'
import PendingOrders from "../screens/restaurant/pending-orders";
import AcceptedOrders from "../screens/restaurant/accepted-orders";
import DeliveredOrders from "../screens/restaurant/delivered-orders";
// import CustPendingOrders from "../screens/customer/cust-order-pend";
// import CustAcceptOrders from "../screens/customer/cust-order-accept";
// import CustDeliveredOrders from "../screens/customer/cust-order-deliv";
import OrderStatus from "../screens/customer/order-status";
import RestDishes from "../screens/customer/res-dish";
export default function App() {
    const { state, dispatch } = useContext(GlobalContext);
    let history = useHistory();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                fetchUserInfo(user.uid);
                console.log('user found !');
            }
            else {
                console.log('user not found');
                dispatch({ type: "AUTH_USER", payload: null });
            }
        });

    }, []);

    const fetchUserInfo = async (uid) => {
        let userRef = doc(db, 'users', uid);
        let userInfo = await getDoc(userRef);
        userInfo = userInfo.data();
        console.log(userInfo.userRole)
        dispatch({ type: "AUTH_USER", payload: userInfo });


    }






    return (
        <Router>
            <div>
                <Nav />
                <Switch>

                    {state?.authUser ?
                        null : <>
                            <Route exact path='/' component={SignIn} />
                            <Route path='/home' component={Home} />
                            <Route path='/rest-reg' component={RestaurantReg} />
                            <Route path='/cust-reg' component={CustomerReg} />
                        </>}
                    {state.authUser?.userRole === 'customer' ?
                        <>
                            <Route path='/' exact component={CustomerHome} />
                            <Route path='/rest-dish' component={RestDishes} />
                            {/* <Route path='/cust-order-pend' component={CustPendingOrders} /> */}
                            {/* <Route path='/cust-order-deliv' component={CustDeliveredOrders} /> */}
                            {/* <Route path='/cust-order-accept' component={CustAcceptOrders} /> */}
                            <Route path='/cust-order-status' component={OrderStatus} />


                        </> : null
                    }

                    {state.authUser?.userRole === 'restaurant' ?
                        <>
                            <Route path='/' exact component={AddDish} />
                            <Route path='/pending-orders' component={PendingOrders} />
                            <Route path='/accepted-orders' component={AcceptedOrders} />
                            <Route path='/delivered-orders' component={DeliveredOrders} />
                        </> : null
                    }









                </Switch>
            </div>
        </Router>
    );
}