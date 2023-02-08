import React from 'react';
import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fontSize } from '@mui/system';
import ApplyButton from './ApplyButton';
const Job = ({ data }) => {

    useEffect(() => {

    }, []);
    return (
        <div class="card" style={{
            backgroundColor: '#212429',
        }}>
            <div class="card-body">
                <h5 class="card-header" style={{
                    backgroundColor: '#F8F8F8',
                    color: 'black'
                }}>{data.jobrole}</h5>
                <div class="card-body">
                    <div class="row" style={{
                    }}>
                        <div class="col-sm-3">
                            <div class="card" style={{
                                backgroundColor: '#F8F8F8'
                            }}>
                                <div class="card-body">
                                    <h6 class="card-title"><span style={{
                                        fontWeight: 'bold',
                                        fontFamily: 'serif'
                                    }}>Company Name</span> </h6>
                                    <p class="card-text"><span style={{
                                        fontFamily: 'courier'
                                    }}>{data.companyname}</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="card" style={{
                                backgroundColor: '#F8F8F8'
                            }}>
                                <div class="card-body">
                                    <h6 class="card-title"><span style={{
                                        fontWeight: 'bold',
                                        fontFamily: 'serif'
                                    }}>Job Type</span></h6>
                                    <p class="card-text"><span style={{
                                        fontFamily: 'courier'
                                    }}>{data.jobtype}</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="card" style={{
                                backgroundColor: '#F8F8F8'
                            }}>
                                <div class="card-body">
                                    <h6 class="card-title"><span style={{
                                        fontWeight: 'bold',
                                        fontFamily: 'serif'
                                    }}>Base Salary</span></h6>
                                    <p class="card-text"><span style={{
                                        fontFamily: 'courier'
                                    }}>{data.basesalary}</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="card" style={{
                                backgroundColor: '#F8F8F8'
                            }}>
                                <div class="card-body">
                                    <h6 class="card-title"><span style={{
                                        fontWeight: 'bold',
                                        fontFamily: 'serif'
                                    }}>Job City</span></h6>
                                    <p class="card-text"><span style={{
                                        fontFamily: 'courier'
                                    }}>{data.cityname}</span></p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="card-body" style={{
                        backgroundColor: '#E8E8E8'
                    }}>
                        <p class="card-text"><span style={{
                            fontWeight: 'bold',
                            fontFamily: 'serif'
                        }}>Job Description</span> : <span style={{
                            fontFamily: 'Courier'
                        }}>{data.jobdescription}</span></p>
                    </div>

                    <div class="card-body" style={{
                        backgroundColor: '#E8E8E8'
                    }}>
                        <p class="card-text"><span style={{
                            fontWeight: 'bold',
                            fontFamily: 'serif'
                        }}>Job Link</span> : <a href="https://www.google.com/" target="_blank"><span style={{
                            fontFamily: 'Courier'
                        }}>{data.joblink}</span></a></p>
                    </div>




                    <div class="card-body" style={{
                        backgroundColor: '#E8E8E8'
                    }}>
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
                                }}>Job Info</span> </Typography>
                            </AccordionSummary>

                            <div class="card-body" style={{
                                backgroundColor: '#E8E8E8'
                            }}>
                                <p class="card-text"><span style={{
                                    fontWeight: 'bold',
                                    fontFamily: 'serif'
                                }}>Job Location</span> : <span style={{
                                    fontFamily: 'Courier'
                                }}>{data.joblocation}</span></p>

                            </div>

                            <div class="card-body" style={{
                                backgroundColor: '#F8F8F8'
                            }}>
                                <p class="card-text"><span style={{
                                    fontWeight: 'bold',
                                    fontFamily: 'serif'
                                }}>Job Preference</span> : <span style={{
                                    fontFamily: 'Courier'
                                }}>{data.requirements.jobPreference}</span></p>

                            </div>

                            <div class="card-body" style={{
                                backgroundColor: '#E8E8E8'
                            }}>
                                <p class="card-text"><span style={{
                                    fontWeight: 'bold',
                                    fontFamily: 'serif'
                                }}>Gender Eligible</span> : <span style={{
                                    fontFamily: 'Courier'
                                }}>{data.requirements.gender}</span></p>

                            </div>

                            <div class="card-body" style={{
                                backgroundColor: '#F8F8F8'
                            }}>
                                <p class="card-text"><span style={{
                                    fontWeight: 'bold',
                                    fontFamily: 'serif'
                                }}>Part Time Available</span> : <span style={{
                                    fontFamily: 'Courier'
                                }}>{data.isparttimeavailable}</span></p>

                            </div>
                            <div class="card-body" style={{
                                backgroundColor: '#E8E8E8'
                            }}>
                                <p class="card-text"><span style={{
                                    fontWeight: 'bold',
                                    fontFamily: 'serif'
                                }}>Contact Person</span> : <span style={{
                                    fontFamily: 'Courier'
                                }}>{data.contactpersonname}</span></p>

                            </div>
                            <div class="card-body" style={{
                                backgroundColor: '#F8F8F8'
                            }}>
                                <p class="card-text"><span style={{
                                    fontWeight: 'bold',
                                    fontFamily: 'serif'
                                }}>Contact Person Number</span> : <span style={{
                                    fontFamily: 'Courier'
                                }}>{data.contactpersonphonenumber}</span></p>

                            </div>


                        </Accordion>

                    </div>





                    <div class="card-body" style={{
                        backgroundColor: '#E8E8E8'
                    }}>
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
                                }}>Job Requirements</span> </Typography>
                            </AccordionSummary>
                            <Accordion style={{
                                backgroundColor: '#E8E8E8'
                            }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography><span style={{
                                        fontWeight: 'bold',
                                        fontFamily: 'serif',
                                    }}>Experience Required</span> </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <ul class="list-group">

                                            {data.requirements.jobTypeExperience.map((data, i) => (
                                                <li class="list-group-item" style={{
                                                    backgroundColor: '#F8F8F8'
                                                }}>{data}</li>
                                            ))}
                                        </ul>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

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
                                    }}>Education Required</span> </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <ul class="list-group">

                                            {data.requirements.education.map((data, i) => (
                                                <li class="list-group-item" style={{
                                                    backgroundColor: '#F8F8F8'
                                                }}>{data}</li>
                                            ))}
                                        </ul>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion style={{
                                backgroundColor: '#E8E8E8'
                            }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography><span style={{
                                        fontWeight: 'bold',
                                        fontFamily: 'serif'
                                    }}>English Proficiency</span> </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <ul class="list-group">

                                            {data.requirements.englishProficiency.map((data, i) => (
                                                <li class="list-group-item" style={{
                                                    backgroundColor: '#F8F8F8'
                                                }}>{data}</li>
                                            ))}
                                        </ul>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

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
                                    }}>Documents Required</span> </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <ul class="list-group">

                                            {data.requirements.documents && data.requirements.documents.map((data, i) => (
                                                <li class="list-group-item" style={{
                                                    backgroundColor: '#F8F8F8'
                                                }}>{data}</li>
                                            ))}
                                        </ul>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                        </Accordion>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default Job;