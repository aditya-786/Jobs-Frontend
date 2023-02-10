import React from 'react';
import Signup from './components/Signup';
import LoginContainer from '../Login/LoginContainer';
import { ToastContainer, toast } from 'react-toastify';
import { routeMap, RoutesConts, stacks, JOBS_BACKEND } from '../../constants/RouterConstants';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { isUserExists } from '../../service/Api';


const SignupContainer = () => {
    let userid = localStorage.getItem("userid");
    const [loading, setLoading] = useState(true);
    const history = useNavigate();

    useEffect(() => {
        if (userid && userid != 'undefined') {
            console.log("Please login you have already registered")
            const loginUrl = RoutesConts.LOGIN;
            console.log(localStorage.getItem('userid'))

            isUserExists(userid)
                .then(response => {
                    console.log(response)
                    if (response) {
                        history(loginUrl);
                    }
                })
        } else setLoading(false);
    }, [history, userid]);

    return (
        <div>
            {loading && <img style={{display:'block', marginLeft: 'auto', marginRight: 'auto', width: '50%'}} src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921' alt='loading' />}
            {!loading && <Signup />}
        </div>
    )
};
export default SignupContainer;