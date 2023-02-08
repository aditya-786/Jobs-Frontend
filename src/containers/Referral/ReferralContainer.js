import React from 'react';
import Referral from './components/Referral';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { isSessionActive } from '../../service/Api'
import { routeMap, RoutesConts, stacks, JOBS_BACKEND } from '../../constants/RouterConstants';
import { ToastContainer, toast } from 'react-toastify';

const ReferralContainer = () => {
    let userid = localStorage.getItem("userid");
    const history = useNavigate();
    useEffect(() => {
        if (userid) {
            // check you are logout or not.
            async function checkSession() {
                const response = await isSessionActive(JOBS_BACKEND.SESSION_STATUS, `?userid=${userid}`);
                return response;
            }
            checkSession().then((response) => {
                if (response === true) {
                    console.log("Session is active", response);
                    const referalUrl = RoutesConts.REFERRAL + '?userId=' + userid;
                    history(referalUrl);

                }
                else {
                    console.log("Session is closed", response);;
                    const loginUrl = RoutesConts.LOGIN + '?userId=' + userid;
                    setTimeout(() => history(loginUrl), 1000);
                }
            });
        }
        else {
            console.log("You need to sing-up")
            history(RoutesConts.SIGNUP);
        }
    }, []);
    return (
        <Referral />
    );
};
export default ReferralContainer;