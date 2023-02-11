import React, { useState } from 'react'
import { Form, Typography, Input } from 'antd';
import Button from 'react-bootstrap/Button'
import SIgn_img from '../../Signup/components/SIgn_img'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routeMap, RoutesConts, stacks, JOBS_BACKEND } from '../../../constants/RouterConstants';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import { sendOtp, loginUser, isSessionActive } from '../../../service/Api'
import { NavLink } from 'react-router-dom'
import { DEFAULT_COLOR } from '../../../constants/colorConstants'
const { Text } = Typography;


const Login = () => {
    let userid = localStorage.getItem("userid");
    const history = useNavigate();

    const [isUserLogin, setIsUserLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [inpval, setInpval] = useState({
        phonenumber: "",
        otp: ""
    })


    const [otpSent, setOtpSent] = useState(false);
    useEffect(() => {
        if (userid && userid != 'undefined') {
            // check you are logout or not.
            async function checkSession() {
                const response = await isSessionActive(JOBS_BACKEND.SESSION_STATUS, `?userid=${userid}`);
                return response;
            }
            checkSession().then((response) => {
                if (response === true) {
                    console.log("Session is active", response);
                    const jobsUrl = RoutesConts.JOBS + '?userId=' + response.userid;
                    console.log(jobsUrl);
                    history(jobsUrl)
                }
                else {
                    console.log("Session is closed", response);;
                    const loginUrl = RoutesConts.LOGIN;
                    setTimeout(() => history(loginUrl), 1000);
                    setLoading(false);
                }
            });
        } else setLoading(false);
        // else {
        //     history(RoutesConts.SIGNUP)
        // }
    }, []);


    const [data, setData] = useState([]);
    const [accountCreated, setAccountCreated] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const getdata = (e) => {
        const { value, id } = e.target;
        const name = id.split('_')[1];
        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
        console.log(inpval);
    }

    async function sendOtpToUser(e) {
        e.preventDefault();
        setButtonClicked(true);
        console.log("sendOtpToUser():");
        console.log(localStorage.getItem('userid'));
        if (!inpval.phonenumber || inpval.phonenumber.length != 10) {
            toast.error('please enter valid phonenumber', {
                position: "top-center",
            });
            return;
        }
        const response = await sendOtp(JOBS_BACKEND.SEND_OTP, { phonenumber: inpval.phonenumber });

        setOtpSent(response.otpSent);
        console.log(response);
        if (response.userid) {
            localStorage.setItem('userid', response.userid);
        }
        setButtonClicked(false);
    }


    async function loginIntoWebsite(e) {
        e.preventDefault();
        setButtonClicked(true);
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
        } else {
            const response = await loginUser(JOBS_BACKEND.LOGIN_USER,
                {
                    phonenumber: inpval.phonenumber,
                    otp: inpval.otp,
                });
            if (response.status === 'success') {
                const jobsUrl = RoutesConts.JOBS + '?userId=' + response.userid;
                console.log(jobsUrl);
                history(jobsUrl)
            }
        }
        setButtonClicked(false);
    }

    return (
        <>
            {!loading &&
                <div className='login-page' style={{marginTop: '-5%', backgroundColor: '#FFFFFF'}}>
                    <div className="login-box">
                        <div className="illustration-wrapper">
                            <img
                                src="https://i.pinimg.com/originals/1f/f3/3e/1ff33ede4825194fdbcf0f9b5e27dc93.gif" alt="login" />
                        </div>
                        <Form
                            name="login-form"
                            initialValues={{ remember: true }}
                        >
                            <p className="form-title">Hey Welcome!</p>
                            <p>Login to your job search</p>

                            <Form.Item
                                name="phonenumber"
                                rules={[{ required: true, message: 'Please input your phone number!' }]}
                            >
                                <Input
                                    addonBefore={(
                                        <Form.Item name="prefix" noStyle>
                                            +91
                                        </Form.Item>
                                    )}
                                    placeholder="Phone Number"
                                    onChange={getdata}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button disabled={buttonClicked} type="primary" htmlType="submit" className="login-form-button" onClick={sendOtpToUser}>
                                    {otpSent ? 'Resend OTP' : 'Send OTP'}
                                    {buttonClicked && <i
                                        className="fa fa-refresh fa-spin"
                                        style={{ marginLeft: "5%" }}
                                    />}
                                </Button>
                            </Form.Item>

                            {otpSent &&
                                <Form.Item
                                    name="otp"
                                    rules={[{ required: true, message: 'Please enter the OTP received' }]}
                                >
                                    <Input
                                        placeholder="Enter OTP received"
                                        onChange={getdata}
                                    />
                                </Form.Item>
                            }

                            {otpSent &&
                                <Form.Item>
                                    <Button disabled={buttonClicked} type="primary" htmlType="submit" className="login-form-button" onClick={loginIntoWebsite}>
                                        Login
                                        {buttonClicked && <i
                                            className="fa fa-refresh fa-spin"
                                            style={{ marginLeft: "5%" }}
                                        />}
                                    </Button>
                                </Form.Item>
                            }

                            <Form.Item>
                                <Text>Not registered?   </Text>
                                <Text style={{ fontWeight: 700, color: DEFAULT_COLOR }} className='move-to-diff-page' onClick={() => history(RoutesConts.SIGNUP)}>Signup here</Text>
                            </Form.Item>
                        </Form>
                        {accountCreated &&
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%', height: '100%' }}>
                                <img src='https://media.tenor.com/BntXpMlrGuEAAAAC/check-correct.gif' alt='registered' />
                                <h5 style={{ textAlign: 'center' }}>Account Created Successfully</h5>
                            </div>}
                    </div>
                    <ToastContainer />
                </div>
            }
            {loading && <img style={{display:'block', marginLeft: 'auto', marginRight: 'auto', width: '50%'}} src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921' alt='loading' />}
            </>
    )
}

export default Login