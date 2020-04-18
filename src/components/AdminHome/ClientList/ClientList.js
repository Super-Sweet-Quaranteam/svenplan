import React, { Component } from 'react';
import {connect} from 'react-redux';


class ClientList extends Component{

state={ 
    
    }

    componentDidMount=()=>{
        this.props.dispatch({type: 'GET_CLIENT_LIST'})
    }

    accessChange=(id, level)=>{
        console.log(level, 'level');
        console.log( id, 'clientid')
        if (level === 1) {
            alert('Admin Access cannot be changed')
            return
        }
        else if(level=== 2 || 3){
            this.props.dispatch({type:"EDIT_ACCESS", payload:{id,level}})
        }
        this.props.dispatch({ type: 'GET_CLIENT_LIST' })
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
                        <th>Access Level</th>
                        <th>Permissions</th>
                        {/* <th>Address</th> */}
                    </tr>
                </thead>
                <tbody>
                    {this.props.reduxState.admin.clientList.map(subscriber => (
                        <tr key={subscriber.id}>
                            <td>{subscriber.company}</td>
                            <td>{subscriber.firstname} {subscriber.lastname}</td>
                            <td>{subscriber.email}</td>
                            <td>{subscriber.phone}</td>
                            <td>{subscriber.level}: { subscriber.level ===3 &&
                            'No Workflow Acccess'}
                            {subscriber.level ===2 &&
                            'Workflow Access'}
                                {subscriber.level === 1 &&
                                    'Administrator'}
                            </td>
                            <td><button key={subscriber.id} onClick={() => this.accessChange(subscriber.id, subscriber.level)} name='subscriber.clientid'>Grant/Revoke Access</button></td>
                            {/* <td>{client.address}</td> */}
                        </tr>))}              
                </tbody>
            </table>
            {JSON.stringify(this.props.reduxState.admin.clientList)}
        </div>
    );
}
}

const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(ClientList);