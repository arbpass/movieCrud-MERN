import React from 'react'
import { Link } from 'react-router-dom'
import './Style.css'

const Navbar = () => {
    return (
        <>
            <nav class="navbar">
                <a href="/home"><h2>movie|</h2></a>
                <div id="navbar-div">
                    <a href="/home">
                        <h4>Home</h4>
                    </a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="#">
                        <h4>About Us</h4>
                    </a>
                </div>
                {/* <a id="drop-phone">DROP&#11167;</a>
                <div id="drop-links">
                    <a href="contact.html">Contact</a>
                    <a href="about.html">About</a>
                </div> */}
            </nav>
        </>
    )
}

export default Navbar