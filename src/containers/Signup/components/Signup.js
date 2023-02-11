import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import SIgn_img from './SIgn_img'
import { NavLink } from 'react-router-dom'

import { Form, Input, Password, Checkbox, Select, DatePicker, Typography, Space } from 'antd';
import FloatInput from '../../FloatInput';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routeMap, RoutesConts, stacks, JOBS_BACKEND } from '../../../constants/RouterConstants';
import axios from 'axios';
import { registerUser } from '../../../service/Api'
import '../Signup.css';
import { DEFAULT_COLOR } from '../../../constants/colorConstants';
const { Option } = Select;
const { Text } = Typography;

const Signup = () => {

    const history = useNavigate();

    const [inpval, setInpval] = useState({
        firstname: "",
        lastname: "",
        phonenumber: "",
        email: "",
        dob: "",
        gender: ""
    })

    function preparaUserRegistrationData() {
        const data = {
            firstname: inpval.firstname,
            lastname: inpval.lastname,
            phonenumber: inpval.phonenumber,
            email: inpval.email,
            dob: inpval.dob,
            gender: inpval.gender,
            age: null,
            mothername: null,
            fathername: null,
            city: null,
            presentaddress: null,
            pancard: null,
            adharcard: null,
            drivinglicense: null,
            qualification: null,
            experience: null,
            currentemployeer: null,
            currentjobrole: null,
            salarypermonth: null,
            languagecomfortable: null,
            resumelink: null
        }
        return data;
    }

    const [data, setData] = useState([]);
    const [accountCreated, setAccountCreated] = useState(false);
    const [alreadyRegistered, setAlreadyRegistered] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);

    const onSelectDob = (date, dateString) => {
        setInpval({
            ...inpval,
            dob: dateString
        });
    }

    const onSelectGender = (gender, genderString) => {
        const { value } = genderString;
        setInpval({
            ...inpval,
            gender: value
        });
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const getdata = (e) => {
        const { value, id } = e.target;
        const name = id.split('_')[1];
        const valData = value.split(' ');
        console.log(name);
        if (name === 'fullname') {
            setInpval(() => {
                return {
                    ...inpval,
                    firstname: valData[0],
                    lastname: valData.length > 1 ? valData[1] : '.'
                }
            })
        } else {
            const data = {
                ...inpval,
                [name]: value
            };
            setInpval(data);
        }
    }

    async function addData(e) {
        e.preventDefault();

        const { firstname, lastname, phonenumber, email, dob, gender } = inpval;

        if (firstname === "") {
            toast.error(' First name is requred!', {
                position: "top-center",
            });
        }
        else if (lastname === "") {
            toast.error('Last name is requred!', {
                position: "top-center",
            });
        }
        else if (phonenumber === "") {
            toast.error('Phone number is requred!', {
                position: "top-center",
            });
        }
        else if (phonenumber.length !== 10) {
            toast.error('Phone number must be of 10 digits', {
                position: "top-center",
            });
        }
        else if (email === "") {
            toast.error('email field is requred', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error('Please enter valid email addres', {
                position: "top-center",
            });
        } else if (dob === "") {
            toast.error('dob field is requred', {
                position: "top-center",
            });
        } else if (gender === "") {
            toast.error('gender field is requred', {
                position: "top-center",
            });
        } else {
            setButtonClicked(true);
            const data = preparaUserRegistrationData();
            const response = await registerUser(JOBS_BACKEND.REGISTER_USER, data)

            if (response) {
                let userid;
                if (response.exists) {
                    toast.info('You are already registered, please login', {
                        position: 'top-center'
                    });
                    userid = response.userid;
                    setAlreadyRegistered(true);
                }
                else {
                    userid = response.payload[0].id;
                    setAccountCreated(true);
                }
                localStorage.setItem("userid", userid);
                const loginUrl = RoutesConts.LOGIN + '?userId=' + userid;
                await delay(5000);
                history(loginUrl)
            }
            console.log(data);
            console.log("data added succesfully");
            setButtonClicked(false);
        }

    }

    return (

        <div className='login-page'>
            <div className="login-box">
                {!accountCreated &&
                    <div className="illustration-wrapper">
                        <img
                            src="https://i.pinimg.com/originals/1f/f3/3e/1ff33ede4825194fdbcf0f9b5e27dc93.gif" alt="login" />
                    </div>
                }
                {!accountCreated &&
                    <Form
                        name="login-form"
                        initialValues={{ remember: true }}
                    >
                        <p className="form-title">Hey Welcome!</p>
                        <p>Sign Up to your job search</p>
                        <Form.Item
                            name="fullname"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input
                                placeholder="Enter your name"
                                onChange={getdata}
                            />
                        </Form.Item>

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

                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Email"
                                onChange={getdata}
                            />
                        </Form.Item>

                        <Form.Item
                            name="dob"
                            rules={[{ required: true, message: 'Please input your date of birth!' }]}
                            width='100%'
                        >
                            <DatePicker style={{ width: '100%' }} placeholder='Select Date of birth'
                                onChange={onSelectDob}
                            />
                        </Form.Item>

                        <Form.Item
                            name="gender"
                            rules={[{ required: true, message: 'Please Select your Gender!' }]}
                        >
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                placeholder='Select your gender'
                                onChange={onSelectGender}
                            >
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="transgender">TransGender</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button disabled={buttonClicked} type="primary" prefix='' htmlType="submit" className="login-form-button" onClick={addData}>
                                Register
                                {buttonClicked && <i
                                    className="fa fa-refresh fa-spin"
                                    style={{ marginLeft: "5%" }}
                                />}
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Text>Already registered?   </Text>
                            <Text style={{ fontWeight: 700, color: DEFAULT_COLOR }} className='move-to-diff-page' onClick={() => history(RoutesConts.LOGIN)}>Login here</Text>
                        </Form.Item>
                    </Form>}
                {accountCreated &&
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%', height: '100%' }}>
                        <img src='https://media.tenor.com/BntXpMlrGuEAAAAC/check-correct.gif' alt='registered' />
                        <h5 style={{ textAlign: 'center' }}>Account Created Successfully</h5>
                    </div>}
            </div>
            <ToastContainer />
        </div>
    )
}

export default Signup