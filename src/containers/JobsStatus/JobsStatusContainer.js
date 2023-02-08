import React from 'react';
import JobsStatus from './components/JobsStatus';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import {isSessionActive} from '../../service/Api'
import { routeMap, RoutesConts, stacks, MITRA_APP_BACKEND } from '../../constants/RouterConstants';
import { ToastContainer, toast } from 'react-toastify';

const JobsStatusContainer = () => {
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
                    const jobsUrl = RoutesConts.JOBS_STATUS+'?userId='+userid;
                    history(jobsUrl);

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
        <JobsStatus/>
    );
};
export default JobsStatusContainer;