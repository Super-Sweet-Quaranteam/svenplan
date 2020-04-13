import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import AddTaskCard from './AddTaskCard';

const AddTask = props => {

    const [count, setCount] = useState(0);

    useEffect(() => {         
       console.log( `You clicked ${count} times`);
    }, [count])
    
    return (
        <div className="addTask">
            <h1>Add a New Task</h1>
            <button onClick={() => setCount(count + 1)} >+</button>
            <h6>hitting + will add a count to another component</h6>
           <AddTaskCard count={count}/>
        </div>
    )
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(AddTask);