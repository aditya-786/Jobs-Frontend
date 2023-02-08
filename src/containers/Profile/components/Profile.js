import React from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routeMap, RoutesConts, stacks, MITRA_APP_BACKEND } from '../../../constants/RouterConstants';
import { useEffect, useState } from 'react';
import { getUserProfile, getCities,saveProfileDetails,profileLogout } from '../../../service/Api'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Profile = () => {
    let userid = localStorage.getItem("userid");
    const history = useNavigate();
    const [cities, setCities] = useState([]);

    const [UserInfo, setUserInfo] = useState({
        firstname: 'NA',
        lastname: 'NA',
        phonenumber: 'NA',
        email: 'NA',
        dob: 'NA',
        gender: 'NA',
        age: 'NA',
        mothername: 'NA',
        fathername: 'NA',
        cityid: 'NA',
        presentaddress: 'NA',
        pancard: 'NA',
        adharcard: 'NA',
        drivinglicense: 'NA',
        qualification: 'NA',
        experience: 'NA',
        currentemployeer: 'NA',
        currentjobrole: 'NA',
        salarypermonth: 'NA',
        languagecomfortable: 'NA',
        resumelink: 'NA',
        city: 'NA',

    });



    const handleSubmit = e => {
        e.preventDefault();
    };

    const handleChange = e => {
        e.preventDefault();
        const { value } = e.target;
        setUserInfo({
            ...UserInfo,
            [e.target.name]: value,
        });
    };


    useEffect(() => {
        async function getProfile() {
            const response = await getUserProfile(MITRA_APP_BACKEND.USER_PROFILE, `?userid=${userid}`);
            return response;
        }
        async function getCitiesApi() {
            const response = await getCities(MITRA_APP_BACKEND.GET_CITIES);
            return response;
        }
        getCitiesApi().then((response) => {
            setCities(response);
            console.log("cities api -> ", response);
        });
        getProfile().then((response) => {
            UserInfo.firstname = response.payload.firstname;
            UserInfo.lastname = response.payload.lastname;
            UserInfo.phonenumber = response.payload.phonenumber;
            UserInfo.email = response.payload.email;
            UserInfo.dob = response.payload.dob;
            UserInfo.gender = response.payload.gender;
            UserInfo.age = response.payload.age;
            UserInfo.mothername = response.payload.mothername;
            UserInfo.fathername = response.payload.fathername;
            UserInfo.cityid = response.payload.cityid;
            UserInfo.presentaddress = response.payload.presentaddress;
            UserInfo.pancard = response.payload.pancard;
            UserInfo.adharcard = response.payload.adharcard;
            UserInfo.drivinglicense = response.payload.drivinglicense;
            UserInfo.qualification = response.payload.qualification;
            UserInfo.experience = response.payload.experience;
            UserInfo.currentemployeer = response.payload.currentemployeer;
            UserInfo.currentjobrole = response.payload.currentjobrole;
            UserInfo.salarypermonth = response.payload.salarypermonth;
            UserInfo.languagecomfortable = response.payload.languagecomfortable;
            UserInfo.resumelink = response.payload.resumelink;
            UserInfo.city = response.payload.city;
            UserInfo.userid = userid

            setUserInfo(UserInfo);
            console.log("Info -> ", UserInfo);
        });

    }, []);

    async function saveProfile(e){
        e.preventDefault();

        console.log("Hello ai m ");
        const userdata = UserInfo;
        // console.log("Updated User Data",userdata);
        async function saveProfile() {
            await saveProfileDetails(MITRA_APP_BACKEND.SAVE_PROFILE_DETAILS,userdata);
        }

        saveProfile().then((response) => {
            // setCities(response);
            alert("Profile updated")
            window.location.reload();
            // console.log("cities api -> ", response);
        });
    }

    async function logout(e){
        e.preventDefault();
        console.log("Here logout");
        async function logoutApi() {
            return await profileLogout(MITRA_APP_BACKEND.PROFILE_LOGOUT,{userid:userid});
        }

        logoutApi().then((response) => {
            // setCities(response);
            console.log(response);
            alert("Profile Logout successfully")
            window.location.reload();
            // console.log("cities api -> ", response);
        });

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
                    <a class="nav-link" href="/mitra/referral">Referrals</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Profile</a>
                </li>
            </ul>
            <div class ="card">
            <div class = "card-body">
            <h5 style={{
                color: '#212429',
                textAlign: 'center',
                margin: '1%',
                fontFamily: 'Andale Mono',
                fontWeight: 'bold'
            }}>Profile Details</h5>
            <hr></hr>
            <div class="card" style={{
                margin: 'auto',
                width: '100%',
                padding: '10px',
            }}>
                <form>
                    <div class="form-group" style={{
                        margin: '2%'
                    }}>
                        <label >First Name</label>
                        <input type="text" class="form-control" placeholder="Enter firstname" name="firstname" value={UserInfo.firstname} onChange={handleChange} />
                    </div>
                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Last Name</label>
                        <input type="text" class="form-control" placeholder="Enter lastname" name="lastname" value={UserInfo.lastname} onChange={handleChange} />
                    </div>
                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Phone Number</label>
                        <input type="text" class="form-control" placeholder="Enter phonenumber" name="phonenumber" value={UserInfo.phonenumber} onChange={handleChange} />
                    </div>
                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Email</label>
                        <input type="text" class="form-control" placeholder="Enter email" name="email" value={UserInfo.email} onChange={handleChange} />
                    </div>

                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >DOB</label>
                        <input type="text" class="form-control" placeholder="Enter dob" name="dob" value={UserInfo.dob} onChange={handleChange} />
                        <p style={{
                            color: 'gray',
                            marginLeft: '1%',
                            fontSize: '15px'
                        }}>  Please Enter DOB FORMAT (YYYY-MM-DD)</p>
                    </div>

                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Gender</label>
                        <input type="text" class="form-control" placeholder="Enter gender" name="gender" value={UserInfo.gender} onChange={handleChange} />
                    </div>

                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Age</label>
                        <input type="number" class="form-control" placeholder="Enter age" name="age" value={UserInfo.age} onChange={handleChange} />
                    </div>
                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Mother Name</label>
                        <input type="text" class="form-control" placeholder="Enter mothername" name="mothername" value={UserInfo.mothername} onChange={handleChange} />
                    </div>
                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Father Name</label>
                        <input type="text" class="form-control" placeholder="Enter fathername" name="fathername" value={UserInfo.fathername} onChange={handleChange} />
                    </div>

                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >City Name</label>
                        <input type="text" class="form-control" placeholder="Enter city" name="city" value={UserInfo.city} onChange={handleChange} disabled={true} />
                    </div>


                    <div class="form-group" style={{
                        margin: '2%'
                    }}>

                        <label style={{
                            // margin: '1%'
                        }}>Choose City</label>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">City</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={UserInfo.city}
                                    label="city"
                                    name="city"
                                    onChange={handleChange}
                                >
                                    {cities.length>0 && cities.map((cityname, index) => (
                                        <MenuItem value={cityname.name}>{cityname.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>

                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Present Address</label>
                        <input type="text" class="form-control" placeholder="Enter present addresss" name="presentaddress" value={UserInfo.presentaddress} onChange={handleChange} />
                    </div>

                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Pancard</label>
                        <input type="text" class="form-control" placeholder="Enter pancard" name="pancard" value={UserInfo.pancard} onChange={handleChange} />
                    </div>

                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Adhar Card</label>
                        <input type="text" class="form-control" placeholder="Enter Adhar card" name="adharcard" value={UserInfo.adharcard} onChange={handleChange} />
                    </div>
                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Driving License</label>
                        <input type="text" class="form-control" placeholder="Enter driving license" name="drivinglicense" value={UserInfo.drivinglicense} onChange={handleChange} />
                    </div>
                    

                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Qualification</label>
                        <input type="text" class="form-control" placeholder="Enter qualification" name="qualification" value={UserInfo.qualification} onChange={handleChange} disabled={true} />
                    </div>


                    <div class="form-group" style={{
                        margin: '2%'
                    }}>

                        <label style={{
                            // margin: '1%'
                        }}>Choose Qualification</label>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Qualification</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={UserInfo.qualification}
                                    label="qualification"
                                    name="qualification"
                                    onChange={handleChange}
                                >
                                        <MenuItem value='9th Class or below'>9th Class or below</MenuItem>
                                        <MenuItem value='Class 10th pass'>Class 10th pass</MenuItem>
                                        <MenuItem value='Class 12th pass'>Class 12th pass</MenuItem>
                                        <MenuItem value='ITI'>ITI</MenuItem>
                                        <MenuItem value='Diploma'>Diploma</MenuItem>
                                        <MenuItem value='Graduate'>Graduate</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>



                    
                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Experience</label>
                        <input type="text" class="form-control" placeholder="Enter experience" name="experience" value={UserInfo.experience} onChange={handleChange} disabled={true} />
                    </div>


                    <div class="form-group" style={{
                        margin: '2%'
                    }}>

                        <label style={{
                            // margin: '1%'
                        }}>Choose Experience</label>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Experience</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={UserInfo.experience}
                                    label="experience"
                                    name="experience"
                                    onChange={handleChange}
                                >
                                        <MenuItem value='No Experience'>No Experience</MenuItem>
                                        <MenuItem value='Less than 1 yr'>Less than 1 yr</MenuItem>
                                        <MenuItem value='1 to 2 years'>1 to 2 years</MenuItem>
                                        <MenuItem value='2 to 5 years'>2 to 5 years</MenuItem>
                                        <MenuItem value='More than 5 years'>More than 5 years</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Current employeer</label>
                        <input type="text" class="form-control" placeholder="Enter currentemployeer" name="currentemployeer" value={UserInfo.currentemployeer} onChange={handleChange}  />
                    </div>
                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Current Job Role</label>
                        <input type="text" class="form-control" placeholder="Enter currentjobrole" name="currentjobrole" value={UserInfo.currentjobrole} onChange={handleChange} />
                    </div>
                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Salary Per Month</label>
                        <input type="text" class="form-control" placeholder="Enter salarypermonth (only in integers)" name="salarypermonth" value={UserInfo.salarypermonth} onChange={handleChange} />
                    </div>
                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Language Comfortable</label>
                        <input type="text" class="form-control" placeholder="Enter languagecomfortable" name="languagecomfortable" value={UserInfo.languagecomfortable} onChange={handleChange}  />
                    </div>

                    <div class="form-group" style={{
                        margin: '2%'
                    }}>                        <label >Resume link</label>
                        <input type="text" class="form-control" placeholder="Enter resumelink" name="resumelink" value={UserInfo.resumelink} onChange={handleChange} />
                    </div>


                    
                    <div class="form-group" style={{
                        margin: '2%',
                        float : 'right'
                    }}>    
                    <button type="submit" class="btn btn-primary btn-lg" onClick={saveProfile}>Save</button>
                    </div>

                    <div class="form-group" style={{
                        margin: '2%',
                        float :'left'
                            }}>
                                <button type="button" class="btn btn-danger btn-lg" onClick={logout}>Logout</button>
                            </div>
                        </form>


                    </div>
                </div>

            </div>
        </div>
    );
};
export default Profile;