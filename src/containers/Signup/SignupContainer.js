import React from 'react';
import Signup from './components/Signup';
import LoginContainer from '../Login/LoginContainer';
import { ToastContainer, toast } from 'react-toastify';
import { routeMap, RoutesConts, stacks, MITRA_APP_BACKEND } from '../../constants/RouterConstants';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';


const SignupContainer = () => {
    let userid = localStorage.getItem("userid");
    const history = useNavigate();
    
    useEffect(() => {
    if(userid){
        console.log("Please login you have already registered")
        const loginUrl = RoutesConts.LOGIN+'?userId='+userid;
        history(loginUrl)
    }
    }, []);

    return(
        <Signup/>
    )
};
export default SignupContainer;