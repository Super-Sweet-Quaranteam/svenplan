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

            <h2>Subscribers using your workflows:</h2>
            <table id="clientTable">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        {/* <th>Address</th> */}
                    </tr>
                </thead>
                <tbody>
                    {this.props.reduxState.admin.clientList.map(subscriber => (
                        <tr key={subscriber.clientid}>
                            <td>{subscriber.company}</td>
                            <td>{subscriber.firstname} {subscriber.lastname}</td>
                            <td>{subscriber.email}</td>
                            <td>{subscriber.phone}</td>
                            {/* <td>{client.address}</td> */}
                        </tr>))}              
                </tbody>
            </table>
        </div>
    );
}
}

const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(ClientList);