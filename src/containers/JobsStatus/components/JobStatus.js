import React from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routeMap, RoutesConts, stacks, MITRA_APP_BACKEND } from '../../../constants/RouterConstants';
import { useEffect, useState } from 'react';
import { sendOtp, loginUser, isSessionActive, getNotAppliedJobs } from '../../../service/Api'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const steps = [];

export default function JobStatus({jobLevels, currentJobLevel, currentJobStatus, currentJobStatusMessage,activeStep}) {

  useEffect(() => {
    console.log(currentJobLevel);

}, []);

  const checkStatus = (step) => {
    return step === 2;
  };

  let labelProps= { optional: React.ReactNode,error : false};
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {jobLevels.map((label, index) => {
          if (index< activeStep) {
            labelProps.optional = (
              <Typography variant="caption" style={{
                color :'green'
              }}>
                PASSED
              </Typography>
            );
          }
          else if (index === activeStep){
            labelProps.optional = (
              <Typography variant="caption" style = {{
                color : (currentJobStatus === 'PASSED'? 'green' : (currentJobStatus === 'FAILED')?'red':'#90EE90')
              }}>
               {currentJobStatus}
              </Typography>
            );
            if(currentJobStatus === 'FAILED') labelProps.error = true;
          }
          else{
            // greater than activeStep.
            labelProps.optional = (
              <Typography variant="caption">
              </Typography>
            );
            labelProps.error = false;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
