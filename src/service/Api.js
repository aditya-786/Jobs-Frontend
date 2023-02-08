import axios from 'axios';
import { routeMap, RoutesConts, stacks, MITRA_APP_BACKEND } from '../constants/RouterConstants';
import { ToastContainer, toast } from 'react-toastify';

export async function registerUser(backendUrl, data) {
    var config = {
        method: 'post',
        url: `${MITRA_APP_BACKEND.HOST}${backendUrl}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            "Cache-Control": null,
            "X-Requested-With": null
        },
        data: data
    };
    let response = await axios(config);
    console.log("Here the data: ",response.data);
    if (!response.data.payload) {
        toast.error(response.data.message, {
            position: "top-center",
        });
        return null;
    }
    return response.data;
}

export async function sendOtp(backendUrl, data) {
    var config = {
        method: 'post',
        url: `${MITRA_APP_BACKEND.HOST}${backendUrl}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            "Cache-Control": null,
            "X-Requested-With": null
        },
        data: data
    };
    let response = await axios(config);
    toast.success(response.data.message, {
            position: "top-center",
    });
}

export async function loginUser(backendUrl, data) {
    var config = {
        method: 'post',
        url: `${MITRA_APP_BACKEND.HOST}${backendUrl}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            "Cache-Control": null,
            "X-Requested-With": null
        },
        data: data
    };
    let response = await axios(config);
    if (!response.data.status === 'success') {
        toast.success(response.data.message, {
            position: "top-center",
        });
    }
    else{
        toast.success(response.data.message, {
            position: "top-center",
        });
    }
    return response.data;
}


export async function isSessionActive(backendUrl, params) {
    var config = {
        method: 'get',
        url: `${MITRA_APP_BACKEND.HOST}${backendUrl}${params}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            "Cache-Control": null,
            "X-Requested-With": null
        },
    };
    let response = await axios(config);
    response = response.data;
    console.log("isSessionActive response",response);
    if (response.payload === 'ACTIVE') {
        return true;
    }
    else if(!response.payload){

    }
    else{
        toast.info('User has been logout, please login again', {
            position: "top-center",
        });
    }
    return false;
}

export async function getNotAppliedJobs(backendUrl, params) {
    var config = {
        method: 'get',
        url: `${MITRA_APP_BACKEND.HOST}${backendUrl}${params}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            "Cache-Control": null,
            "X-Requested-With": null
        },
    };
    let response = await axios(config);
    response = response.data;
    return response.payload;

}

export async function applyJob(backendUrl, data) {
    var config = {
        method: 'post',
        url: `${MITRA_APP_BACKEND.HOST}${backendUrl}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            "Cache-Control": null,
            "X-Requested-With": null
        },
        data: data
    };
    let response = await axios(config);
    return response.data;
}

export async function getJobsStatus(backendUrl, params) {
    var config = {
        method: 'get',
        url: `${MITRA_APP_BACKEND.HOST}${backendUrl}${params}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            "Cache-Control": null,
            "X-Requested-With": null
        },
    };
    let response = await axios(config);
    return response.data;
}

export async function refer(backendUrl, data) {
    var config = {
        method: 'post',
        url: `${MITRA_APP_BACKEND.HOST}${backendUrl}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            "Cache-Control": null,
            "X-Requested-With": null
        },
        data: data
    };
    await axios(config);
}

export async function getUserProfile(backendUrl, params) {
    var config = {
        method: 'get',
        url: `${MITRA_APP_BACKEND.HOST}${backendUrl}${params}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            "Cache-Control": null,
            "X-Requested-With": null
        },
    };
    let response = await axios(config);
    return response.data;
}

export async function getCities(backendUrl) {
    var config = {
        method: 'get',
        url: `${MITRA_APP_BACKEND.HOST}${backendUrl}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            "Cache-Control": null,
            "X-Requested-With": null
        },
    };
    let response = await axios(config);
    return response.data;
}

export async function saveProfileDetails(backendUrl, data) {
    var config = {
        method: 'patch',
        url: `${MITRA_APP_BACKEND.HOST}${backendUrl}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            "Cache-Control": null,
            "X-Requested-With": null
        },
        data: data
    };
    await axios(config);
}

export async function profileLogout(backendUrl, data) {
    var config = {
        method: 'post',
        url: `${MITRA_APP_BACKEND.HOST}${backendUrl}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            "Cache-Control": null,
            "X-Requested-With": null
        },
        data: data
    };
    return await axios(config);
}