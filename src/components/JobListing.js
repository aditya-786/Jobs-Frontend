import React, { useEffect, useState } from "react";
import { Image, Button } from 'antd';
import { MdLocationOn } from 'react-icons/md';
import { GrMoney } from 'react-icons/gr';
import { BiTime } from 'react-icons/bi'
import '../styles/JobListing.scss';
import JobDescription from "./JobDescription";
import { getNotAppliedJobs, applyJob } from "../service/Api";
import { JOBS_BACKEND } from "../constants/RouterConstants";

const formatNumberToKFormat = value => {
    const formatter = Intl.NumberFormat('en-IN', { notation: 'compact' });
    return formatter.format(value);
};

const JobListing = ({ data }) => {

    const [jobApplied, setJobApplied] = useState(false);

    async function clickApplyJob(jobid) {
        jobApplied(true);
        const response = await applyJob(`${JOBS_BACKEND.HOST}${JOBS_BACKEND.APPLY_JOB}`, {
            userid: localStorage.getItem('userid'),
            jobid
        });
        jobApplied(false);
    }

    const [showJobDescription, setShowJobDescription] = useState(false);
    return (
        <div className="job-main-container">
            <div className="job-header">
                <Image src={data.logo}
                    className="company-logo"
                />

                <div className="job-subheader">
                    <div className="title-and-salary">
                        <p className="job-title">{data.jobRole}</p>
                        <div className="job-salary">
                            <GrMoney style={{ marginTop: '5px' }} />
                            <p style={{ marginLeft: '15px' }}>{formatNumberToKFormat(data.baseSalary)} <span>/year</span></p>
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
                onClick={() => clickApplyJob(data.jobId)}
                >
                    Apply
                </Button>
            </div>

            {showJobDescription && <JobDescription data={data} open={showJobDescription} okok={() => setShowJobDescription(false)} oncancel={() => setShowJobDescription(false)} />}

        </div>
    )
};

export default JobListing;