import React, { Component } from 'react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2'


class Subscribers extends Component{

    state={ 
            query: []
        }

    componentDidMount=()=>{
        this.props.dispatch({type: 'GET_CLIENT_LIST'});
        this.setState({
            query:this.props.reduxState.admin.clientList
        })
    }

    accessChange=(id, level)=>{
        if (level === 1) {
            Swal.fire('Admin Access Cannot Be Changed')
            return
        }
        else{
            this.props.dispatch({type:"EDIT_ACCESS", payload:{id,level}})
        }
    }
       
    getPredictions=(value)=>{
          const list = this.props.reduxState.admin.clientList.map(subscriber=>{
            return (subscriber.firstname + ", ") 
        })
          if (value.length > 0) {
            let filteredList = list.filter(name => name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
            this.setState({query: filteredList})
        }
    }
  
    handleChange=()=>{
        const value = this.search.value
        this.setState({query: value})
        const predictions = this.getPredictions(value);
            this.setState({
                predictions
            });
    }


    render(){
        return (
            <div >
                <h2>Subscribers using SvenPlans:</h2>
                <form className="form">
                    <li>
                        <label> Search</label>
                        <input type="text" placeholder="search subscriber list" 
                        ref={input => this.search = input} onChange={this.handleChange}/>
                        <span><input className="btn-sml"type="submit" value="Submit Query"/></span>
                        <p>{this.state.query}</p>
                    </li>
                </form>
                <table id="clientTable">
                    <thead className="sticky">
                        <tr>
                            <th className="sticky">Company</th>
                            <th className="sticky">Name</th>
                            <th className="sticky">Email</th>
                            <th className="sticky">Phone</th>
                            <th className="sticky">Access Level</th>
                            <th className="sticky">Permissions</th>
                            {/* <th className="sticky">Address</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reduxState.admin.clientList.map(subscriber => (
                            <tr key={subscriber.id}>
                                <td>{subscriber.company}</td>
                                <td>{subscriber.firstname} {subscriber.lastname}</td>
                                <td>{subscriber.email}</td>
                                <td>{subscriber.phone}</td>
                                <td>{subscriber.level}:
                                { subscriber.level ===3 &&
                                'Team Member'}
                                {subscriber.level ===2 &&
                                'Enterprise Admin'}
                                    {subscriber.level === 1 &&
                                        'Application Administrator'}
                                </td>
                                <td><button className="btn-sml" key={subscriber.id} onClick={() => this.accessChange(subscriber.id, subscriber.level)} name='subscriber.clientid'>Grant/Revoke Enterprise Access</button></td>
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
  
export default connect(putReduxStateOnProps)(Subscribers);
