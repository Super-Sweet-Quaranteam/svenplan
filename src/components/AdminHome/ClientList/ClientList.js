import React, { Component } from 'react';

import logo from '../../Logo/svenplan-logo2.png'
import { useParams } from 'react-router-dom';

class ClientList extends Component{
state={ clients:[
    {clientid:0,
    company:'Target',
        address:'1500 Target Lane',
        phone:'(555)123-4567',
        email:'target@target.com'
        },
    {clientid:1,
        company: 'Nabisco',
        address: '1500 Nabisco Lane',
        phone: '(555)333-2323',
        email: 'nabs@nabisco.com'
    }
]
}
    render(){
    return (
        <div >
            <img src={logo} width="75px" alt="SvenPlan Logo" />
            <p>Client List </p>

            <h2>Clients using your workflows:</h2>
            <table id="clientTable">
                <thead>
                <tr>
                    <th>Company</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.clients.map(client => (
                        <tr key={client.clientid}><td>{client.company}</td><td>{client.address}</td><td>{client.phone}</td><td>{client.email}</td></tr>))}              
                </tbody>
            </table>

        </div>
    );
}
}

export default ClientList;
