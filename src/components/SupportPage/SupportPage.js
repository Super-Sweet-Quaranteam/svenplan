import React, { Component } from 'react';
import {connect} from 'react-redux';
import './SupportPage.css'
import Swal from 'sweetalert2';


class SupportPage extends Component {

    state={
        alert: '',
        display: true
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
        this.setState({alert: '', display: false});
    }
  
    render() {
        return (
            <>
            {this.state.display === true
            ?
            <>
                <h1>SvenPlan Support</h1>
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
                <h4 className="help">For immediate help with any questions or concerns please contact your SvenPlans point of contact.</h4>
            </>
            :
            <>
                <br/>
                <br/>
                <h2>Your team lead will get with you shortly!</h2>
                <br/>
                <p className="help">For immediate help with any questions or concerns please contact your SvenPlan point of contact.</p>
            </>
            }
            </>
        );
    }
}


const putReduxStateOnProps=(reduxState)=>({
    reduxState
});
  
export default connect(putReduxStateOnProps)(SupportPage);