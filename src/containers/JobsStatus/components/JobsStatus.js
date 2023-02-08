import React from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routeMap, RoutesConts, stacks, MITRA_APP_BACKEND } from '../../../constants/RouterConstants';
import { useEffect, useState } from 'react';
import { sendOtp, loginUser, isSessionActive, getNotAppliedJobs, getJobsStatus } from '../../../service/Api'
import { NavLink } from 'react-router-dom'
import JobStatus from './JobStatus.js'
import Job from '../../Jobs/components/Job'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const JobsStatus = () => {
    let userid = localStorage.getItem("userid");
    const history = useNavigate();
    const [jobsStatusData, setJobsStatusData] = useState([]);
    const [JobStatusesPresent, setJobStatusesPresent] = useState(false);



    function getJobLevel(currentJobLevel) {
        if (currentJobLevel === 'DOCUMENT_VERIFICATION') return 1;
        if (currentJobLevel === 'BACKGROUND_CHECK') return 2;
        if (currentJobLevel === 'SCHEDULED_INTERVIEWS') return 3;
        if (currentJobLevel === 'HIRED') return 4;
    }
    useEffect(() => {
        async function getJobs() {
            const response = await getJobsStatus(MITRA_APP_BACKEND.GET_JOBS_STATUS, `?userid=${userid}`);
            return response;
        }
        getJobs().then((response) => {
            console.log("Response-> ", response);
            if(!response.payload){
                setJobsStatusData(response);
                setJobStatusesPresent(true);
            }
            


        });
    }, []);
    return (
        <div style = {{
            backgroundColor:'#F8F8F8'
        }}>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/mitra/jobs">New Jobs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Jobs Status</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/mitra/referral">Referrals</a>
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
            }}>Recent Applied Jobs</h5>
            <hr></hr>

            {JobStatusesPresent === true &&
                jobsStatusData.jobs.map((data, idx) => (
                    <div class = "card">
                    <div class="card-body">
                        <div class="card-body">
                            <JobStatus jobLevels={jobsStatusData.jobLevels}
                                currentJobLevel={data.level}
                                currentJobStatus={data.status}
                                currentJobStatusMessage={data.message}
                                activeStep={getJobLevel(data.level)}
                            />
                        </div>

                        <div class="card-body" style={{
                            backgroundColor: '#E8E8E8'
                        }}>

                            <Box sx={{ width: '100%' }}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={6}>
                                        <Item style = {{
                                            color : 'black',
                                            fontWeight:'bold',
                                            textAlign: 'center',
                                            fontFamily: 'Andale Mono',
                                        }}>Job AppliedAt</Item>
                                        <Item>{data.createdat}</Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Item style = {{
                                            color : 'black',
                                            fontWeight:'bold',
                                            textAlign: 'center',
                                            fontFamily: 'Andale Mono',
                                        }}>Company</Item> 
                                        <Item>{data.companyname}</Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Item style = {{
                                            color : 'black',
                                            fontWeight:'bold',
                                            textAlign: 'center',
                                            fontFamily: 'Andale Mono',
                                        }}>Job Role</Item>                                    
                                          <Item>{data.jobrole}</Item>
                                         </Grid>
                                         <Grid item xs={6}>
                                    <Item style = {{
                                            color : 'black',
                                            fontWeight:'bold',
                                            textAlign: 'center',
                                            fontFamily: 'Andale Mono',
                                        }}>Base Salary</Item>                                    
                                          <Item>{data.basesalary}</Item>
                                         </Grid>
                                    
                                </Grid>
                            </Box>

                            <br></br>
                            <Accordion style={{
                                backgroundColor: '#F8F8F8'
                            }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography><span style={{
                                        fontWeight: 'bold',
                                        fontFamily: 'serif'
                                    }}>Job Details</span> </Typography>
                                </AccordionSummary>
                                <div style={{
                                    backgroundColor: '#212429',
                                    margin: '2%',
                                    borderRadius: '2%',
                                }}>
                                    <Job data={data} />
                                </div>
                            </Accordion>
                        </div>

                    </div>
                    <hr></hr>

                    </div>


                ))
            }
        </div>
    );
};
export default JobsStatus;


/*
APPLIED_JOB         (PENDING,PASSED,FAILED)
   |
DOCUMENT_VERIFICATION   (PENDING,PASSED,FAILED)
   |
BACKGROUND_CHECK       (PENDING,PASSED,FAILED)
   |
SCHEDULED_INTERVIEWS    (PENDING,PASSED,FAILED)
   |
HIRED                    (PENDING,PASSED,FAILED)




*/