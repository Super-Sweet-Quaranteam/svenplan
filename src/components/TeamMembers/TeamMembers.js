import React, { Component } from 'react';
import {connect} from 'react-redux';


class TeamMembers extends Component{

state={ 
    
    }

    componentDidMount=()=>{
        this.props.dispatch({type: 'GET_CLIENT_LIST'})
    }

    accessChange=(id, level)=>{
        if (level === 1) {
            alert('Admin Access cannot be changed')
            return
        }
        else{
            this.props.dispatch({type:"EDIT_ACCESS", payload:{id,level}})
        }
        }
       

    render(){
    return (
        <div >

            <h2>Team Members using your workflows:</h2>
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
                    {this.props.user.currentUser.team_id === null ?
                    <p>Not part of a team</p>
                    :
                    this.props.reduxState.admin.clientList.map(subscriber => 
                        this.props.user.currentUser.team_id === subscriber.team_id &&
                    
                        <tr key={subscriber.id}>
                            <td>{subscriber.company}</td>
                            <td>{subscriber.firstname} {subscriber.lastname}</td>
                            <td>{subscriber.email}</td>
                            <td>{subscriber.phone}</td>
                            <td>{subscriber.level}:
                            { subscriber.level ===3 &&
                            'Team Member'}
                            {subscriber.level ===2 &&
                            'Workflow Access'}
                                {subscriber.level === 1 &&
                                    'Application Administrator'}
                            </td>
                            {(this.props.reduxState.user.currentUser.id !== subscriber.id) 
                            ?
                                <td><button key={subscriber.id} onClick={() => this.accessChange(subscriber.id, subscriber.level)} 
                                    name='subscriber.clientid'>Grant/Revoke Workflow Access</button></td>
                            :
                                <td>Cannot Change Personal Access Level</td>
                            }
                            {/* <td>{client.address}</td> */}
                        </tr>
                                
                                )} 
                                             
                </tbody>
            </table>
        </div>
    );
}
}

const putReduxStateOnProps=(reduxState)=>({
    reduxState,
    user: reduxState.user
  });
  
export default connect(putReduxStateOnProps)(TeamMembers);