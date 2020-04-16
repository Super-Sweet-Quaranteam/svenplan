import React, { Component } from 'react';
import {connect} from 'react-redux';


class ClientList extends Component{

state={ 
    clients:[
        {   
            clientid:0,
            company:'Target',
            address:'1500 Target Lane',
            phone:'(555)123-4567',
            email:'target@target.com'
        },
        {   
            clientid:1,
            company: 'Nabisco',
            address: '1500 Nabisco Lane',
            phone: '(555)333-2323',
            email: 'nabs@nabisco.com'
        }]
    }

    componentDidMount=()=>{
        this.props.dispatch({type: 'GET_CLIENT_LIST'})
    }

    render(){
    return (
        <div >
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
                        <tr key={client.clientid}>
                            <td>{client.company}</td>
                            <td>{client.address}</td>
                            <td>{client.phone}</td>
                            <td>{client.email}</td>
                        </tr>))}              
                </tbody>
            </table>
            <br/>
            {JSON.stringify(this.props.reduxState.admin)}
        </div>
    );
}
}

const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(ClientList);