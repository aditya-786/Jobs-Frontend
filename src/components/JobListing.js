import React, { useEffect, useState } from "react";
import { Image, Button } from 'antd';
import { MdLocationOn } from 'react-icons/md';
import { GrMoney } from 'react-icons/gr';
import { BiTime } from 'react-icons/bi'
import '../styles/JobListing.scss';
import JobDescription from "./JobDescription";
import { getNotAppliedJobs, applyJob } from "../service/Api";
import { JOBS_BACKEND } from "../constants/RouterConstants";
import { toast, ToastContainer } from "react-toastify";

const formatNumberToKFormat = value => {
    const formatter = Intl.NumberFormat('en-IN', { notation: 'compact' });
    return formatter.format(value);
};

const JobListing = ({ data }) => {

    const [jobApplying, setJobApplying] = useState(false);
    const [deleteJob, setDeleteJob] = useState(false);

    const delay = ms => new Promise(res => setTimeout(res, ms));
    async function clickApplyJob(jobid) {
        setJobApplying(true);
        console.log('Adi', jobid);
        const response = await applyJob(JOBS_BACKEND.APPLY_JOB, {
            userid: localStorage.getItem('userid'),
            jobid
        });
        await delay(2000);
        setJobApplying(false);
        toast.success('Job Applied Successfully', {
            position: 'top-center'
        });
        await delay(1000);
        setDeleteJob(true);
        await delay(3000);
        window.location.reload();
    }

    const [showJobDescription, setShowJobDescription] = useState(false);
    return (
        <div className="job-main-container">
            {!deleteJob && (<>
                <div className="job-header">
                    <Image src={data.logo}
                        className="company-logo"
                    />

                    <div className="job-subheader">
                        <div className="title-and-salary">
                            <p className="job-title">{data.jobRole}</p>
                            <div className="job-salary">
                                <GrMoney className="job-sal-icon" />
                                <p className="job-sal-text">{formatNumberToKFormat(data.baseSalary)} <span>/year</span></p>
                            </div>
                        </div>
                        <div className="location-and-experience">
                            <div className="job-location">
                                <MdLocationOn className="job-loc-icon" />
                                <p className="job-loc-text">{data.jobLocation} </p>
                            </div>
                            <div className="job-experience">
                                <BiTime className="job-exp-icon" />
                                <p className="job-exp-text">{data.experience} </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="job-description">
                    <p className="job-descp-text">{data.jobDescription} </p>
                </div>

                <div className="job-btns-container">
                    <Button type="primary" prefix='' htmlType="submit" className="job-btn" onClick={() => setShowJobDescription(true)}>
                        Description
                    </Button>
                    <Button type="primary" prefix='' htmlType="submit" className="job-btn-apply"
                        onClick={() => clickApplyJob(data.id)}
                        disabled={jobApplying}
                    >
                        Apply
                        {jobApplying && <i
                            className="fa fa-refresh fa-spin"
                            style={{ marginLeft: "5%" }}
                        />}
                    </Button>
                </div>


                {showJobDescription && <JobDescription data={data} open={showJobDescription} okok={() => setShowJobDescription(false)} oncancel={() => setShowJobDescription(false)} />}
                <ToastContainer />
            </>)}
            {deleteJob && <img src='https://i.ibb.co/7k2bwxR/done-gif.gif'
                className="job-applied" alt="applied"
            />}
        </div>
    )
};

export default JobListing;