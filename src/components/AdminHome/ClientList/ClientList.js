import React from 'react';

import logo from '../../Logo/svenplan-logo2.png'

function ClientList(props) {


    return (
        <div >
            <img src={logo} width="75px" alt="SvenPlan Logo" />
            <p>Client List </p>

            <h2>Clients using your workflows:</h2>
            <p>Existing clients will render conditionally </p>

        </div>
    );
}

export default ClientList;
