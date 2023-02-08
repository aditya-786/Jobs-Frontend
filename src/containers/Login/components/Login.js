import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SIgn_img from '../../Signup/components/SIgn_img'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routeMap, RoutesConts, stacks, MITRA_APP_BACKEND } from '../../../constants/RouterConstants';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import {sendOtp,loginUser,isSessionActive} from '../../../service/Api'
import { NavLink } from 'react-router-dom'


const Login = () => {
    let userid = localStorage.getItem("userid");
    const history = useNavigate();

    const [isUserLogin,setIsUserLogin] = useState(false);
    const [inpval, setInpval] = useState({
        phonenumber: "",
        otp: ""
    })


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
                    toast.info('You are already login, you can click on home button to go to home page', {
                        position: "top-center",
                    })
                    setIsUserLogin(true);
                }
                else{
                    console.log("Session is closed",response);;
                    const loginUrl = RoutesConts.LOGIN+'?userId='+userid;
                    setTimeout(() => history(loginUrl), 1000);
                }
            });
        }
        else{
            history(RoutesConts.SIGNUP)
        }
        }, []);


    const [data, setData] = useState([]);
    const getdata = (e) => {
        const { value, name } = e.target;
        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    }

    async function sendOtpToUser(e){
        e.preventDefault();
        console.log("sendOtpToUser():");
        if(!inpval.phonenumber || inpval.phonenumber.length!=10){
            toast.error('please enter valid phonenumber', {
                position: "top-center",
            });
            return;
        }
        await sendOtp(MITRA_APP_BACKEND.SEND_OTP, {phonenumber : inpval.phonenumber,userid : userid});
    }


    async function loginIntoWebsite(e) {
        e.preventDefault();
        const { phonenumber, otp } = inpval;
        if (phonenumber === "") {
            toast.error('phonenumber field is requred', {
                position: "top-center",
            });
        }
        else if (otp === "") {
            toast.error('otp required', {
                position: "top-center",
            });
        } else if (phonenumber.length != 10) {
            toast.error('phonenumber muts be of 10 length', {
                position: "top-center",
            });
        } else if (otp.length != 4) {
            toast.error('otp must be of 4 length', {
                position: "top-center",
            });
        } else {
            const response = await loginUser(MITRA_APP_BACKEND.LOGIN_USER,
                {
                    phonenumber: inpval.phonenumber,
                    otp: inpval.otp,
                    userid: userid
                });
            if (response.status === 'success') {
                const jobsUrl = RoutesConts.JOBS + '?userId=' + userid;
                console.log(jobsUrl);
                history(jobsUrl)
            }
        }
    }

    return (
        <>
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>Sign IN</h3>
                        <Form >

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="text" name='phonenumber' onChange={getdata} placeholder="Enter phonenumber" />
                            </Form.Group>
                            <Button variant="primary" className='mb-3 col-lg-6' onClick={sendOtpToUser} style={{ background: "rgb(67, 185, 127)" }}>
                                send otp
                            </Button>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                                <Form.Control type="text" name='otp' onChange={getdata} placeholder="Enter otp" />
                            </Form.Group>

                            <Button variant="primary" className='col-lg-6' onClick={loginIntoWebsite} style={{ background: "rgb(67, 185, 127)" }} type="submit">
                                Submit
                            </Button>
                        </Form>
                        <p className='mt-3'>Already Have an Account <span>SignIn</span> </p>
                        
                        {isUserLogin === true && (
                            <span><NavLink to="/mitra/jobs">Go to Home</NavLink></span>
                        )}
                    </div>
                    <Card variant="outlined">
                        <h5 style={{
                            color: '#43B97F',
                            fontFamily: 'Fantasy'
                        }}>If you want to get hired, then this is the right place</h5>
                                                <hr />

                        <ul>
                            <li>You can apply jobs</li>
                            <li>You can see the status of jobs</li>
                            <li>You can refer your friends</li>
                            <li>You can update your profile anytime</li>
                            <li>Our recruiters will contact you, if you found fit for the role</li>
                        </ul>
                        <hr />

                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hurray, So What are you waiting for ?</p>

                    </Card>
                </section>
                <ToastContainer />
            </div>
        </>
    )
}

export default Login