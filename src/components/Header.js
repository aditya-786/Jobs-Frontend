import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <NavLink to="/" style={{
                    marginLeft: '1%',
                    fontFamily: 'Courier New'
                }} className="text-decoration-none text-light">Find and Apply Jobs here</NavLink>
            </Navbar>
        </>
    )
}

export default Header