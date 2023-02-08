import React from 'react';

// New jobs, jobs , referral, profile.
const Home = () => {

    return (
        <div>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">New Jobs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/mitra/jobsStatus">Jobs Status</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/mitra/referral">Referrals</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/mitra/profile">Profile</a>
                </li>
            </ul>
        </div>
        
    );
};
export default Home;
