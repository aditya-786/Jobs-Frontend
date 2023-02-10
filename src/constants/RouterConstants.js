export const RoutesConts = {
  SIGNUP: '/',
  LOGIN: '/login',
  HOME: '/home',
  JOBS: '/jobs',
  JOBS_STATUS: '/jobsStatus',
  REFERRAL: '/referral',
  PROFILE: '/profile',
};


export const stacks = {
  HOME: 'home',
  LOGIN: 'login',
  HOME: 'home',
  JOBS: 'jobs',
  JOBS_STATUS: 'status',
  REFERRAL: 'referral',
  PROFILE: 'profile'
};

export const routeMap = {
  [RoutesConts.LOGIN]: {
    pathname: RoutesConts.LOGIN,
    stack: stacks.LOGIN
  },
  [RoutesConts.HOME]: {
    pathname: RoutesConts.HOME,
    stack: stacks.HOME
  },
  [RoutesConts.JOBS]: {
    pathname: RoutesConts.JOBS,
    stack: stacks.JOBS
  },
  [RoutesConts.JOBS_STATUS]: {
    pathname: RoutesConts.JOBS_STATUS,
    stack: stacks.JOBS_STATUS
  },
  [RoutesConts.REFERRAL]: {
    pathname: RoutesConts.REFERRAL,
    stack: stacks.REFERRAL
  },
  [RoutesConts.PROFILE]: {
    pathname: RoutesConts.PROFILE,
    stack: stacks.PROFILE
  }

};

export const JOBS_BACKEND = {
  HOST: process.env.REACT_APP_BE_HOST,
  REGISTER_USER: process.env.REACT_APP_REGISTER_USER,
  SEND_OTP: process.env.REACT_APP_SEND_OTP,
  LOGIN_USER: process.env.REACT_APP_LOGIN_USER,
  SESSION_STATUS: process.env.REACT_APP_SESSION_STATUS,
  NOT_APPLIED_JOBS: process.env.REACT_APP_NOT_APPLIED_JOBS,
  APPLY_JOB: process.env.REACT_APP_APPLY_JOB,
  GET_JOBS_STATUS: process.env.REACT_APP_GET_JOBS_STATUS,
  REFER_A_FRIEND: process.env.REACT_APP_REFER_A_FRIEND,
  USER_PROFILE: process.env.REACT_APP_USER_PROFILE,
  UPDATE_USER_PROFILE: process.env.REACT_APP_UPDATE_USER_PROFILE,
  PROFILE_LOGOUT: process.env.REACT_APP_PROFILE_LOGOUT,
  GET_CITIES: process.env.REACT_APP_GET_CITIES,
  SAVE_PROFILE_DETAILS: process.env.REACT_APP_SAVE_PROFILE_DETAILS,
  CHECK_USER_EXISTS: process.env.REACT_APP_CHECK_USER_EXISTS
}
