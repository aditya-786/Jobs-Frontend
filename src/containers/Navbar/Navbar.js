import React, { useState } from "react";
import "./Navbar.css";
import {
    FaFacebookSquare,
    FaInstagramSquare,
    FaYoutubeSquare,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from 'react-icons/rx';

import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [showMediaIcons, setShowMediaIcons] = useState(false);
    const [menuClicked, setMenuClicked] = useState(0);
    return (
        <>
            <nav className="main-nav">
                {/* 2nd menu part  */}
                <div
                    className={
                        showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
                    }>
                    <ul>
                        <li>
                            <NavLink to="/">Jobs</NavLink>
                        </li>
                        <li>
                            <NavLink to="/jobsStatus">Jobs Status</NavLink>
                        </li>
                        <li>
                            <NavLink to="/referral">Referrals</NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                    </ul>
                </div>

                {/* 3rd social media links */}
                <div className="social-media">
                    {/* hamburget menu start  */}
                    <div className="hamburger-menu">
                        <a href="#" onClick={() => { setShowMediaIcons(!showMediaIcons); setMenuClicked(menuClicked + 1) }}>
                            {menuClicked % 2 === 0 && <GiHamburgerMenu style={{ color: '#000' }} />}
                            {menuClicked % 2 === 1 && <RxCross1 style={{ color: '#000' }} />}
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
