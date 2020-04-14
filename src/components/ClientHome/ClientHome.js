import React, { useState, useEffect } from 'react';
import ClientNav from './ClientNav';
import ClientProfile from './ClientProfile';


const ClientHome =(props)=>{

    const [displayProfile, setDisplayProfile] = useState(false);

    return (
        <>
            <ClientNav />
            <h3>Client Home </h3>
            <img className="hero-image" src="/images/skyline.png" alt="skyline"/>
            <ul>
                <li>New Project</li>
                <li>Existing Projects</li>
            </ul>
            {displayProfile
                ? 
                <ClientProfile 
                    setDisplayProfile={displayProfile}
                /> 
                : 
                null}
        </>
    );
}

export default ClientHome;
