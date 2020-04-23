import React, { Component } from 'react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';


class SupportPage extends Component {

    state={
        alert: ''
    }

    handleChange=(e)=>{
        this.setState({alert: e.target.value});
    }

    handleSubmit=()=>{
        Swal.fire('Success!')
        this.props.dispatch({type: 'SUBMIT_ALERT', payload: {
            id: this.props.reduxState.user.currentUser.id,
            team: this.props.reduxState.user.currentUser.team_id,
            description: this.state.alert
            }
        });
        this.setState({alert: ''});
    }
  
    render() {
        return (
            <>
                <h1>SvenPlans Support</h1>
                <br/>
                <br/>
                <form className="form" onSubmit={this.handleSubmit}>
                    <li>
                        <label>Description</label>
                        <input type="text" placeholder="looking for help with..." onChange={(e)=>this.handleChange(e)}/>
                        <span>please describe the issue</span>
                    </li>
                    <input type="submit" className="btn-sml" value="submit"/>
                </form>
                <br/>
                <br/>
                <h4>For immediate help with any questions or concerns please contact your SvenPlans point of contact.</h4>

            </>
        );
    }
}


const putReduxStateOnProps=(reduxState)=>({
    reduxState
});
  
export default connect(putReduxStateOnProps)(SupportPage);