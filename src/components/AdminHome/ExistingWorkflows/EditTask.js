import React, {Component} from 'react';
import {connect} from 'react-redux';


class EditTask extends Component {

    render() {
        console.log(this.displayTask)
        return (
            <div className="taskCard">
                <hr/>
                
            </div>
        );
    }
}


const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(EditTask);