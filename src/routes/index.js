import React, { useEffect, useState } from 'react';
import { Route, useLocation,Routes } from 'react-router-dom';
import values from 'lodash/values';
import get from 'lodash/get';
import HomePageContainer from '../containers/Home/HomePageContainer';
import JobsContainer from '../containers/Jobs/JobsContainer';
import ProfileContainer from '../containers/Profile/ProfileContainer';
import JobsStatusContainer from '../containers/JobsStatus/JobsStatusContainer';
import LoginContainer from '../containers/Login/LoginContainer';
import ReferralContainer from '../containers/Referral/ReferralContainer';
import SignupContainer from '../containers/Signup/SignupContainer';
import { routeMap, RoutesConts, stacks } from '../constants/RouterConstants';



const AppRoute = () => {
  const location = useLocation();
  const [pageDirection, setPageDirection] = useState('left');
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const currentKey = Math.random();

  useEffect(() => {
    // const newPath = location.pathname;
    // const newPathOrder = values(routeMap).filter(({ pathname }) => pathname === newPath)[0].order;
    // if (newPath !== currentPath) {
    //   const direction = currentPathOrder < newPathOrder ? 'left' : 'right';
    //   setCurrentPath(newPath);
    //   setCurrentPathOrder(newPathOrder);
    //   setPageDirection(direction);
    // }
  });

  // PREVENT GOING BACK TO ON-BOARDING FROM HOME PAGE
  useEffect(() => {
    console.log("Every time you login into some page you will get here.");
    // const routeMappingForNewPath = get(routeMap, location.pathname);
    // if (currentPath === Routes.HOME_PAGE && routeMappingForNewPath.stack === stacks.ON_BOARDING) {
    //   if (AuthService.getUserID()) {
    //     Navigation.push({ pathname: Routes.HOME_PAGE }, true);
    //   }
    // } else if (
    //   currentPath === Routes.SELECT_QUALIFICATION &&
    //   location.pathname === Routes.LANGUAGE_SELECTION
    // ) {
    //   const llpFlag = AppService.getLanguageLandingPageFlag();
    //   const inNewLandingPageTreatmentGroup =
    //     ABTestService.getABTestVariant(ABTests.NEW_LADING_PAGE_TEST.name) ===
    //     ABTests.NEW_LADING_PAGE_TEST.variants[1];
    //   const stepsDontIncludeLanguageSelection = inNewLandingPageTreatmentGroup || llpFlag !== 'en';
    //   if (stepsDontIncludeLanguageSelection) {
    //     window.location.href = localStorage.getItem('initialUrl');
    //   }
    // }
  });

  return (
    <Routes>
          <Route path='/' element={<SignupContainer />} />
          <Route path={RoutesConts.LOGIN} element={<LoginContainer />} />
          <Route path={RoutesConts.HOME} element={<HomePageContainer />} />
          <Route path={RoutesConts.JOBS} element={<JobsContainer />} />
          <Route path={RoutesConts.JOBS_STATUS} element={<JobsStatusContainer />} />
          <Route path={RoutesConts.REFERRAL} element={<ReferralContainer />} />
          <Route path={RoutesConts.PROFILE} element={<ProfileContainer />} />
    </Routes>
  );
};

export default AppRoute;
