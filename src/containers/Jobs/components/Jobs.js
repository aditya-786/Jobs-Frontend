import React from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routeMap, RoutesConts, stacks, JOBS_BACKEND } from '../../../constants/RouterConstants';
import { useEffect, useState } from 'react';
import { sendOtp, loginUser, isSessionActive, getNotAppliedJobs } from '../../../service/Api'
import { NavLink } from 'react-router-dom'
import Job from './Job'
import ApplyButton from './ApplyButton';

const Jobs = () => {

    let userid = localStorage.getItem("userid");
    const history = useNavigate();
    const [jobsData, setJobsData] = useState([]);

    useEffect(() => {
        async function getJobs() {
            const response = await getNotAppliedJobs(JOBS_BACKEND.NOT_APPLIED_JOBS, `?userid=${userid}`);
            return response;
        }
        getJobs().then((response) => {
            console.log("Response-> ", response);
            setJobsData(response);
        });

    }, []);


    return (
        <div style={{
            // backgroundColor: '#F8F8F8'
            transform: 'scale(1)'
        }}>
            {/* <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">New Jobs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/jobsStatus">Jobs Status</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/referral">Referrals</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/profile">Profile</a>
                </li>
            </ul> */}

            <h5 style={{
                color: '#212429',
                textAlign: 'center',
                margin: '2%',
                fontFamily: 'Andale Mono',
                fontWeight: 'bold'
            }}>New Jobs</h5>
            <hr></hr>

            {jobsData.map((data, idx) => (
                <div style={{
                    backgroundColor: '#212429',
                    margin: '2%',
                    borderRadius: '2%',
                }}>
                    <Job data={data} />
                    <ApplyButton userid={userid} jobid={data.id} />
                </div>
            ))}

        </div>

    );
};
export default Jobs;