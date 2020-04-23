import React, { Component } from 'react';
import {connect} from 'react-redux';


class SupportPage extends Component {

    state = {}

  
    render() {
        return (
            <>
                <h1>SvenPlans Support</h1>

                <h4>For questions or concerns please contact your SvenPlans point of contact.</h4>

                <h3>send a message here</h3>
                <input type="text"/>
            </>
        );
    }
}


const putReduxStateOnProps=(reduxState)=>({
    reduxState
});
  
export default connect(putReduxStateOnProps)(SupportPage);