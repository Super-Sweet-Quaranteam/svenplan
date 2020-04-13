import React from 'react';
import {connect} from 'react-redux';

const AddTaskCard = (props) => {
    



    return (
        <div className="sub">
            <hr/>
            <h2>This Card is a subtask, displaying two levels deep</h2>
            <h3>three, if you count app.js</h3>

            <div>
               <p>this is being displayed from form in AddTaskCard: </p> 
               { props.cardState.name } @ {props.cardState.time}
            </div>
            <br/>
        </div>
    )
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(AddTaskCard);