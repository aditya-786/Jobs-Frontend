import React from 'react';
import Profile from './components/Profile';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import {isSessionActive} from '../../service/Api'
import { routeMap, RoutesConts, stacks, MITRA_APP_BACKEND } from '../../constants/RouterConstants';
import { ToastContainer, toast } from 'react-toastify';

const ProfileContainer = () => {
   // check if you are logout then you need to login.
    // if userid not present in local storage, means you need to singup.
    
    let userid = localStorage.getItem("userid");
    const history = useNavigate();
    useEffect(() => {
        if(userid){
            // check you are logout or not.
            async function checkSession(){
                const response = await isSessionActive(MITRA_APP_BACKEND.SESSION_STATUS,`?userid=${userid}`);
                return response;
            }
            checkSession().then((response) =>{
                if(response === true){
                    console.log("Session is active",response);
                    const profileUrl = RoutesConts.PROFILE+'?userId='+userid;
                    history(profileUrl);

                }
                else{
                    console.log("Session is closed",response);;
                    const loginUrl = RoutesConts.LOGIN+'?userId='+userid;
                    setTimeout(() => history(loginUrl), 1000);
                }
            });
        }
        else{
            console.log("You need to sing-up")
            history(RoutesConts.SIGNUP);
        }
        }, []);
    return (
        <Profile/>
    );
};
export default ProfileContainer;