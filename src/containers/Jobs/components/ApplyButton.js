import React from 'react';
import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fontSize } from '@mui/system';
import { applyJob } from '../../../service/Api'
import { routeMap, RoutesConts, stacks, MITRA_APP_BACKEND } from '../../../constants/RouterConstants';
import { ToastContainer, toast } from 'react-toastify';

const ApplyButton = ({jobid,userid}) => {

    async function applyJobClick(e){
       const response =  await applyJob(MITRA_APP_BACKEND.APPLY_JOB,{jobid : jobid,userid:userid});
        alert(response.message);
        window.location.reload();

    }
    return (
            <div class="row" >
                <div class="col" style={{
                    color : 'white',
                    margin:'1%',

                }}>
                    Get ready To be Hired, Please Click on Apply Button for applying to this job. Your application will go through various stages of approval so be Patient!
                </div>
                <div class="col">
                    <button type="button" style={{
                        backgroundColor: '#E8E8E8',
                        color: 'black',
                        float: 'right',
                        overflow: 'hidden',
                        margin:'1%',
                    }} class="btn btn-primary btn-lg btn-block"  onClick={applyJobClick}>Apply Job</button>
                </div>
            </div>
    )

};


export default ApplyButton;