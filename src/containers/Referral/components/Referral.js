import React from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routeMap, RoutesConts, stacks, MITRA_APP_BACKEND } from '../../../constants/RouterConstants';
import { useEffect, useState } from 'react';
import { sendOtp, loginUser, isSessionActive, getNotAppliedJobs, getJobsStatus, refer } from '../../../service/Api'
import { NavLink } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



const Referral = () => {
    let userid = localStorage.getItem("userid");
    const history = useNavigate();
    const [inpval, setInpval] = useState({
        phonenumber: "",
    })



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
    async function referAFriend(e) {
        e.preventDefault();

        function containsOnlyNumbers(str) {
            return /^([0-9]+-)*([0-9]+)$/.test(str);
          }
          
        const { phonenumber } = inpval;
        if (phonenumber === "") {
            alert('phonenumber field is requred')
        } else if (phonenumber.length != 10) {
            alert('Please enter the valid phone number')
        } 
        else if(!containsOnlyNumbers(phonenumber)){
            alert('Please enter only digits')
        }
        else {
            await refer(MITRA_APP_BACKEND.REFER_A_FRIEND, { referrerUserId: userid, referralPhoneNumber: inpval.phonenumber });
            alert("Your friend is referred to Mitra Partner.")
        }
        window.location.reload();
    }


    return (
        <div>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" href="/mitra/jobs">New Jobs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/mitra/jobsStatus">Jobs Status</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Referrals</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/mitra/profile">Profile</a>
                </li>
            </ul>
            <h5 style={{
                color: '#212429',
                textAlign: 'center',
                margin: '2%',
                fontFamily: 'Andale Mono',
                fontWeight: 'bold'
            }}>Refer your friend</h5>
            <hr></hr>
            <div class="card" style={{
                margin: 'auto',
                width: '90%',
                padding: '10px',
            }}>
                <div class="card-body">
                    <h5 style={{
                        color: '#212429',
                        textAlign: 'center',
                        margin: '2%',
                        fontFamily: 'Andale Mono',
                        fontWeight: 'bold'

                    }}>Refer your friend and earn money upto ₹4000 rupees. You just need to enter the phone number of your connection who is looking for the job. Our Telecaller team will contact him and if He get hired by 'Mitra', You will get referral Bonus.</h5>
                    <h5 style={{
                        color: '#212429',
                        textAlign: 'center',
                        margin: '2%',
                        fontFamily: 'Andale Mono',
                        fontWeight: 'bold'
                    }}>So What are you waiting for! </h5>

                    <Form >
                        <div >
                            <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail" style={{
                                margin: 'auto',
                                width: '50%',
                                padding: '20px',
                            }}>
                                <Form.Control type="text" name='phonenumber' onChange={getdata} placeholder="Enter phonenumber" />
                                <br></br>
                                <Button variant="primary" className='mb-3 col-lg-6' onClick={referAFriend} style={{
                                    background: "rgb(67, 185, 127)",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '12px',
                                    margin: 'auto',
                                    width: '100%',
                                }}>
                                    Refer your friend
                                </Button>
                            </Form.Group>
                        </div>

                    </Form>
                </div>
            </div>
        </div >
    );
};
export default Referral;