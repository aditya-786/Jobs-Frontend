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
                    <a class="nav-link" href="/jobsStatus">Jobs Status</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/referral">Referrals</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/profile">Profile</a>
                </li>
            </ul>
        </div>

    );
};
export default Home;
