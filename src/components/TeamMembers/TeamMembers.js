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
       

    getPredictions = (value) => {
        const firstNameList = this.props.reduxState.admin.clientList.map(subscriber => {
            return (subscriber.firstname + ", ");
        })
        const lastNameList = this.props.reduxState.admin.clientList.map(subscriber => {
            return (subscriber.lastname + ", ");
        })
        const combined = firstNameList.concat(lastNameList)
        if (value.length > 0) {
            let filteredList = combined.filter(name => name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
            this.setState({ query: filteredList });
        }
        if (value.length === 0) {
            this.setState({
                query: ['search by first name']
            })
        }
        console.log(this.state)
    }

    handleChange = () => {
        const value = this.search.value
        this.setState({ prediction: value })
        this.getPredictions(value);
    }

    render(){
    return (
        <div >

            <h2>Users using your workflows:</h2>
            <form className="form">
                <li>
                    <label> Search</label>
                    <input type="text" placeholder="search subscriber list"
                        ref={input => this.search = input} onChange={this.handleChange} />
                    {/* <span><input className="btn-sml"type="submit" value="Submit Query"/></span> */}
                    <span><h2>{this.state.query}</h2></span>
                </li>
            </form>
            <table id="clientTable" className="tbl-sml">
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
                    <p>Not part of a workflow group</p>
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
                            'Project User'}
                            {subscriber.level ===2 &&
                            'Workflow Creator'}
                                {subscriber.level === 1 &&
                                    'Application Administrator'}
                            </td>
                            {(this.props.reduxState.user.currentUser.id !== subscriber.id) 
                            ?
                                <td><button className="btn-sml" key={subscriber.id} onClick={() => this.accessChange(subscriber.id, subscriber.level)} 
                                    name='subscriber.clientid'>Grant/Revoke Workflow Admin Access</button></td>
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