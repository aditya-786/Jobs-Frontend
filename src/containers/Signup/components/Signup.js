import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SIgn_img from './SIgn_img'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routeMap, RoutesConts, stacks, MITRA_APP_BACKEND } from '../../../constants/RouterConstants';
import axios from 'axios';
import {registerUser} from '../../../service/Api'

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
    const getdata = (e) => {
        const { value, name } = e.target;
        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })

    }

   async function addData(e){
        e.preventDefault();

        const { firstname, lastname, phonenumber, email, dob, gender } = inpval;
        console.log(inpval);

        if (firstname === "") {
            toast.error(' firstname field is requred!', {
                position: "top-center",
            });
        }
        else if (lastname === "") {
            toast.error(' lastname field is requred!', {
                position: "top-center",
            });
        }
        else if (phonenumber === "") {
            toast.error(' phonenumber field is requred!', {
                position: "top-center",
            });
        }
        else if (phonenumber.length !== 10) {
            toast.error(' phonenumber must be of 10 digits', {
                position: "top-center",
            });
        }
        else if (email === "") {
            toast.error('email field is requred', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error('plz enter valid email addres', {
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
            console.log("data added succesfully");
            const data = preparaUserRegistrationData();
            const response = await registerUser(MITRA_APP_BACKEND.REGISTER_USER, data);
            if(response){
                const userid = response.payload[0].id;
                localStorage.setItem("userid",userid);
                const loginUrl = RoutesConts.LOGIN+'?userId='+userid;
                history(loginUrl)
            }
        }

    }

    return (
        <>  
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>Sign Up</h3>
                        <Form >
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control type="text" name='firstname' onChange={getdata} placeholder="Enter firstname" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control type="text" name='lastname' onChange={getdata} placeholder="Enter lastname" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control type="text" name='phonenumber' onChange={getdata} placeholder="Enter phonenumber" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control onChange={getdata} name='dob' type="date" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="text" name='gender' onChange={getdata} placeholder="enter gender" />
                            </Form.Group>
                            <Button variant="primary" className='col-lg-6' onClick={addData} style={{ background: "rgb(67, 185, 127)" }} type="submit">
                                Submit
                            </Button>
                        </Form>
                        <p className='mt-3'>Already Have an Account <span><NavLink to="mitra/login"> SignIn</NavLink></span> </p>
                    </div>
                    <SIgn_img />
                </section>

                <ToastContainer />
            </div>
        </>
    )
}

export default Signup