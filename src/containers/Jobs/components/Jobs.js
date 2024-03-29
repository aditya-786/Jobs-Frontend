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
import JobListing from '../../../components/JobListing';
import Loading from '../../../components/Loading';

const Jobs = () => {

    const userid = localStorage.getItem('userid');
    const DEFAULT_LOGO = 'https://cdn.logo.com/hotlink-ok/logo-social.png';
    const [jobsData, setJobsData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getNotAppliedJobs(JOBS_BACKEND.NOT_APPLIED_JOBS, `?userid=${userid}`)
            .then(response => {
                const jobsList = [];
                response.map(item => {
                    jobsList.push({
                        id: item.id,
                        jobRole: item.jobrole,
                        jobDescription: item?.jobdescription,
                        minEducation: item?.requirements?.education?.length > 0 ? item?.requirements?.education[0] : '',
                        documents: item?.requirements?.documents.join(', '),
                        experience: item?.requirements?.jobTypeExperience.length > 0 ? item?.requirements?.jobTypeExperience[0] : 'Fresher',
                        skills: item?.skills,
                        englishProficiency: item?.requirements.englishProficiency,
                        baseSalary: item.basesalary,
                        maxSalary: item.maxearnings,
                        joiningBonus: item.joiningbonus,
                        referralBonus: item.referralbonus,
                        logo: item.logo || DEFAULT_LOGO,
                        companyId: item.companyid,
                        jobType: item.jobtype,
                        jobLocation: item.joblocation,
                        contactPersonName: item.contactpersonname,
                        contactPersonPhoneNumber: item.contactpersonphonenumber,
                        createdAt: item.createdat,
                        companyName: item.companyname
                    });
                });
                setJobsData(jobsList);
                setLoading(false);
            }).catch(error => {
                console.log(error);
            });
    }, [userid]);


    return (
        <div style={{
            transform: 'scale(1)'
        }}>
            <h5 style={{
                color: '#212429',
                textAlign: 'center',
                margin: '2%',
                fontFamily: 'Andale Mono',
                fontWeight: 'bold'
            }}>New Jobs</h5>
            <hr></hr>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {jobsData.length > 0 && jobsData.map((data, idx) => (
                    <JobListing data={data} key={data.id} />
                ))}
            </div>
            {jobsData.length === 0 && !loading &&
                <img src='https://cdn.dribbble.com/users/962778/screenshots/4107007/search_states.gif' alt='Nothing Found'
                    style={{ display: 'block', margin: 'auto', width: '70%', height: '300px' }}
                />
            }
            {
                loading &&
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
                    <Loading />
                </div>
            }
        </div>

    );
};
export default Jobs;