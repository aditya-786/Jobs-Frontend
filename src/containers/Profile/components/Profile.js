import React from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routeMap, RoutesConts, stacks, JOBS_BACKEND } from '../../../constants/RouterConstants';
import { useEffect, useState } from 'react';
import { getUserProfile, getCities, saveProfileDetails, profileLogout } from '../../../service/Api'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Form, Input, Select, Typography, Checkbox, Button, DatePicker, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { DEFAULT_COLOR } from '../../../constants/colorConstants';
import { BsAsterisk } from 'react-icons/bs';
import moment from 'moment';
const { Text } = Typography;
const { Option } = Select;

const Profile = () => {
    let userid = localStorage.getItem("userid");
    const history = useNavigate();
    const [cities, setCities] = useState([]);
    const [accountCreated, setAccountCreated] = useState(true);
    const [buttonClicked, setButtonClicked] = useState(false);
    const addData = () => {

    }
    const onSelectDob = (date, dateString) => {
        setUserInfo({
            ...UserInfo,
            dob: dateString
        });
    }

    const onSelectGender = (gender, genderString) => {
        const { value } = genderString;
        setUserInfo({
            ...UserInfo,
            gender: value
        });
    }

    const onSelectExperience = (exp, expStr) => {
        const { value } = expStr;
        setUserInfo({
            ...UserInfo,
            experience: value
        });
    }

    const onSelectQualification = (qual, qualStr) => {
        const { value } = qualStr;
        setUserInfo({
            ...UserInfo,
            qualification: value
        });
    }

    const [form] = Form.useForm();

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

    const getdata = e => {
        e.preventDefault();
        const { id, value } = e.target;
        const name = id.split('_')[1];
        setUserInfo({
            ...UserInfo,
            [name]: value,
        });
    };


    useEffect(() => {
        async function getProfile() {
            const response = await getUserProfile(JOBS_BACKEND.USER_PROFILE, `?userid=${userid}`);
            return response;
        }
        async function getCitiesApi() {
            const response = await getCities(JOBS_BACKEND.GET_CITIES);
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

            setUserInfo({ ...UserInfo, email: UserInfo.email });
            console.log("Info -> ", UserInfo);
            form.setFieldValue(UserInfo);
            setAccountCreated(false);
        });

    }, [userid]);

    async function saveProfile(e) {
        e.preventDefault();

        console.log("Hello ai m ");
        const userdata = UserInfo;
        // console.log("Updated User Data",userdata);
        async function saveProfile() {
            await saveProfileDetails(JOBS_BACKEND.SAVE_PROFILE_DETAILS, userdata);
        }

        saveProfile().then((response) => {
            // setCities(response);
            toast.success('Profile updated', {
                position: 'top-center'
            });
            // window.location.reload();
            // console.log("cities api -> ", response);
        });
        // console.log(userdata);
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    async function logout(e) {
        e.preventDefault();
        console.log("Here logout");
        async function logoutApi() {
            return await profileLogout(JOBS_BACKEND.PROFILE_LOGOUT, { userid: userid });
        }

        logoutApi().then((response) => {
            // setCities(response);
            console.log(response);
            localStorage.removeItem('userid');
            toast.success('Profile log out successfully', {
                position: 'top-center'
            });
            delay(3000);
            window.location.reload();
            // console.log("cities api -> ", response);
        });

    }

    const [addressDetailsClicked, setAddressDetailsClicked] = useState(false);
    const [educationDetailsClicked, setEducationDetailsClicked] = useState(false);
    const [jobDetailsClicked, setJobDetailsClicked] = useState(false);
    const [documentDetailsClicked, setDocumentDetailsClicked] = useState(false);


    return (
        <div className='login-page' style={{ backgroundColor: '#FFFFFF' }}>
            <div className="login-box">
                {!accountCreated &&
                    <div className="illustration-wrapper">
                        <img
                            src="https://cdn.dribbble.com/users/108637/screenshots/2971812/comp_1.gif" alt="login" />
                    </div>
                }
                {!accountCreated &&
                    <Form
                        name="login-form"
                        initialValues={{
                            firstname: UserInfo.firstname,
                            lastname: UserInfo.lastname,
                            email: UserInfo.email,
                            phonenumber: UserInfo.phonenumber,
                            gender: UserInfo.gender,
                            dob: moment(UserInfo.dob),
                            city: UserInfo.city || 'NA',
                            presentaddress: UserInfo.presentaddress || 'NA',
                            qualification: UserInfo.qualification,
                            experience: UserInfo.experience,
                            languagecomfortable: UserInfo.languagecomfortable,
                            currentemployeer: UserInfo.currentemployeer || 'NA',
                            currentjobrole: UserInfo.currentjobrole || 'NA',
                            salarypermonth: UserInfo.salarypermonth || '0',
                            resumelink: UserInfo.resumelink || 'NA',
                            adharcard: UserInfo.adharcard || 'NA',
                            pancard: UserInfo.pancard || 'NA',
                            drivinglicense: UserInfo.drivinglicense || 'NA'
                        }}
                        form={form}
                    >
                        <p className="form-title">Hey {UserInfo.firstname}!</p>
                        <p>Have a look at your profile</p>
                        <Form.Item
                            name="firstname"
                            label='First Name'
                            style={{ display: 'flex', flexDirection: 'column' }}
                            rules={[{ required: true, message: 'Please input your first name!' }]}
                        >
                            <Input
                                placeholder="Enter your first name"
                                onChange={getdata}
                            />
                        </Form.Item>

                        <Form.Item
                            name="lastname"
                            label='Last Name'
                            rules={[{ required: true, message: 'Please input your last name!' }]}
                        >
                            <Input
                                placeholder="Enter your last name"
                                onChange={getdata}
                            />
                        </Form.Item>

                        <Form.Item
                            name="phonenumber"
                            label='Mobile'
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input
                                addonBefore={(
                                    <Form.Item name="prefix" noStyle>
                                        +91
                                    </Form.Item>
                                )}
                                placeholder="Phone Number"
                                disabled={true}
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label='Email'
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Email"
                                onChange={getdata}
                                disabled={true}
                            />
                        </Form.Item>

                        <Form.Item
                            name="dob"
                            label='Date of Birth'
                            rules={[{ required: true, message: 'Please input your date of birth!' }]}
                            width='100%'
                        >
                            <DatePicker style={{ width: '100%' }} placeholder='Select Date of birth'
                                onChange={onSelectDob}
                            />
                        </Form.Item>

                        <Form.Item
                            name="gender"
                            label='Gender'
                            rules={[{ required: true, message: 'Please Select your Gender!' }]}
                        >
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                placeholder='Select your gender'
                                onChange={onSelectGender}
                            >
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="transgender">TransGender</Option>
                            </Select>
                        </Form.Item>

                        {!addressDetailsClicked &&
                            <Form.Item>
                                <Button style={{ backgroundColor: '#000' }} type="primary" prefix='' htmlType="submit" className="login-form-button" onClick={() => {
                                    setJobDetailsClicked(false); setAddressDetailsClicked(true); setEducationDetailsClicked(false); setDocumentDetailsClicked(false);
                                }
                                }>
                                    Check address details
                                </Button>
                            </Form.Item>
                        }

                        {addressDetailsClicked &&
                            (<>
                                <Form.Item
                                    name="city"
                                    label='City'
                                    rules={[{ required: true, message: 'Please input your city name!' }]}
                                >
                                    <Input
                                        placeholder="Enter your city name"
                                        onChange={getdata}
                                        style={{ textTransform: 'capitalize' }}
                                    />
                                </Form.Item>


                                <Form.Item
                                    name="presentaddress"
                                    label='Present Address'
                                    rules={[{ required: true, message: 'Please input your present address!' }]}
                                >
                                    <Input
                                        placeholder="Enter your present address"
                                        onChange={getdata}
                                    />
                                </Form.Item></>)
                        }

                        {!educationDetailsClicked &&
                            <Form.Item>
                                <Button style={{ backgroundColor: '#000' }} type="primary" prefix='' htmlType="submit" className="login-form-button" onClick={() => {
                                    setJobDetailsClicked(false); setAddressDetailsClicked(false); setEducationDetailsClicked(true); setDocumentDetailsClicked(false);
                                }
                                }>
                                    Check education details
                                </Button>
                            </Form.Item>
                        }

                        {educationDetailsClicked &&
                            (<>
                                <Form.Item
                                    name="qualification"
                                    label='Qualification'
                                    rules={[{ required: true, message: 'Please select your highest qualification!' }]}
                                >
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder='Select your qualification'
                                        onChange={onSelectQualification}
                                    >
                                        <Option value="iti">ITI</Option>
                                        <Option value="diploma">Diploma</Option>
                                        <Option value="btech">B.Tech</Option>
                                        <Option value="mtech">M.Tech</Option>
                                        <Option value="phd">P.Hd</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="experience"
                                    label='Experience'
                                    rules={[{ required: true, message: 'Please select your experience!' }]}
                                >
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder='Select your Experience'
                                        onChange={onSelectExperience}
                                    >
                                        <Option value="fresher">Fresher</Option>
                                        <Option value="Less than 1 year">Less than 1 year</Option>
                                        <Option value="1 to 2 years">1-2 Years</Option>
                                        <Option value="2 to 5 years">2-5 Years</Option>
                                        <Option value="More than 5 years">5+ Years</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="languagecomfortable"
                                    label='Language Comfortable'
                                    rules={[{ required: true, message: 'Please input your language comfortable!' }]}
                                >
                                    <Input
                                        placeholder="Enter your language comfortable"
                                        onChange={getdata}
                                    />
                                </Form.Item>
                            </>)}

                        {!jobDetailsClicked &&
                            <Form.Item>
                                <Button style={{ backgroundColor: '#000' }} type="primary" prefix='' htmlType="submit" className="login-form-button" onClick={() => {
                                    setJobDetailsClicked(true); setAddressDetailsClicked(false); setEducationDetailsClicked(false); setDocumentDetailsClicked(false);
                                }}>
                                    Check job details
                                </Button>
                            </Form.Item>
                        }

                        {jobDetailsClicked &&
                            (<>
                                <Form.Item
                                    name="currentemployeer"
                                    label='Current Employeer'
                                    rules={[{ required: true, message: 'Please input your current employeer!' }]}
                                >
                                    <Input
                                        placeholder="Enter your current employeer"
                                        onChange={getdata}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="currentjobrole"
                                    label='Current Job Role'
                                    rules={[{ required: true, message: 'Please input your current job role!' }]}
                                >
                                    <Input
                                        placeholder="Enter your current job role"
                                        onChange={getdata}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="salarypermonth"
                                    label='Salary per month'
                                    rules={[{ required: true, message: 'Please input your salary per month!' }]}
                                >
                                    <Input
                                        placeholder="Enter your salary per month"
                                        onChange={getdata}
                                        addonBefore={(
                                            <Form.Item name="prefix" noStyle>
                                                ₹
                                            </Form.Item>
                                        )}
                                    />
                                </Form.Item>
                            </>)}

                        {!documentDetailsClicked &&
                            <Form.Item>
                                <Button type="primary" prefix='' htmlType="submit" className="login-form-button" style={{ backgroundColor: '#000' }} onClick={() => {
                                    setJobDetailsClicked(false); setAddressDetailsClicked(false); setEducationDetailsClicked(false); setDocumentDetailsClicked(true);
                                }}>
                                    Check document details
                                </Button>
                            </Form.Item>
                        }

                        {documentDetailsClicked &&
                            (<>
                                <Form.Item
                                    name="resumelink"
                                    label='Resume'
                                    rules={[{ required: true, message: 'Please insert google drive resume link, else NA' }]}
                                >
                                    <Input
                                        placeholder="Enter your google drive resume link"
                                        onChange={getdata}
                                    />
                                </Form.Item>


                                <Form.Item
                                    name="adharcard"
                                    label='Aadhar'
                                    rules={[{ required: true, message: 'Please insert google drive aadhar link, else NA' }]}
                                >
                                    <Input
                                        placeholder="Enter your google drive aadhar link"
                                        onChange={getdata}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="pancard"
                                    label='PAN Card'
                                    rules={[{ required: true, message: 'Please insert google drive pan card link, else NA' }]}
                                >
                                    <Input
                                        placeholder="Enter your google drive pan card link"
                                        onChange={getdata}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="drivinglicense"
                                    label='Driving License'
                                    rules={[{ required: true, message: 'Please insert google drive driving license link, else NA' }]}
                                >
                                    <Input
                                        placeholder="Enter your google drive driving license link"
                                        onChange={getdata}
                                    />
                                </Form.Item>
                            </>)}


                        {/* <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item> */}

                        <Form.Item>
                            <Button style={{ marginTop: '5%' }} disabled={buttonClicked} type="primary" prefix='' htmlType="submit" className="login-form-button" onClick={saveProfile}>
                                Update
                                {buttonClicked && <i
                                    className="fa fa-refresh fa-spin"
                                    style={{ marginLeft: "5%" }}
                                />}
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button style={{ marginTop: '5%' }} disabled={buttonClicked} type="primary" prefix='' htmlType="submit" className="login-form-button" onClick={logout}>
                                Sign Out
                                {buttonClicked && <i
                                    className="fa fa-refresh fa-spin"
                                    style={{ marginLeft: "5%" }}
                                />}
                            </Button>
                        </Form.Item>

                        {/* <Form.Item>
                            <Text>Already registered?   </Text>
                            <Text style={{ fontWeight: 700, color: DEFAULT_COLOR }} className='move-to-diff-page' onClick={() => history(RoutesConts.LOGIN)}>Login here</Text>
                        </Form.Item> */}
                    </Form>}
                {accountCreated &&
                    // <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%', height: '100%' }}>
                    //     <img src='https://media.tenor.com/BntXpMlrGuEAAAAC/check-correct.gif' alt='registered' />
                    //     <h5 style={{ textAlign: 'center' }}>Account Created Successfully</h5>
                    // </div>
                    <Spin indicator={<LoadingOutlined
                        style={{
                            fontSize: 24,
                        }}
                        spin
                    />} size='large' tip='Loading...' />
                }
            </div>
            <ToastContainer />
        </div>
    );
};
export default Profile;