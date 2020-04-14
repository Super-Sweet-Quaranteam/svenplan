import React, { useState, useEffect } from 'react';


function ClientNav(props) {



    return (
        <>
            <nav className="nav-wrapper">
                <ul className="nav">
                    <li className="nav-logo"><img src="/images/square-logo.png" alt="logo" height="80px"></img></li>
                    <li className="nav-item" onClick={()=>props.setDisplayProfile(!props.displayProfile)}><a className="nav-link" href="#/clientHome">Profile</a></li>
                    <li className="nav-item"><a className="nav-link" href="#adminHome">New Projects</a></li>
                    <li className="nav-item"><a className="nav-link" href="#container">Existing Projects</a></li>
                    <li className="nav-item"><a className="nav-link" href="#add-task">Risk Data</a></li>
                    <li className="nav-item"><a className="nav-link" href="#add-task">Business Models</a></li>
                    <li className="nav-item"><a className="nav-link" href="#add-task">Support</a></li>
                </ul>
            </nav>
        </>
    );  
}

export default ClientNav;