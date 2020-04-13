import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import AddSubTask from './AddSubTask';

const AddTaskCard = (props) => {
    
    const [time, setTime] = useState(new Date())

    const [state, setState] = useState({name: 'new task'})

    const changeTime = () => {
        setTime(new Date())
    }

    const handleChange=(e)=>{
        setState({
            name: e.target.value,
            time: Date()
        });
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        props.dispatch({type: 'SENDING_NAME', payload: state})
    }

    useEffect(() => {
        const tick = setInterval(() => {
            changeTime()
        }, 1000)
        return () => clearInterval(tick)
    })
    return (
        <div className="taskCard">
            <hr/>
            <h1>This Card is inserted into AddTask component</h1>
            
            <form onSubmit={handleSubmit}>
                <input type="text" name="typeHere" value={state.name} onChange={(e)=>handleChange(e)}/>
                <input type="submit" value={time.toLocaleTimeString()}/>
            </form>
            <div>
                { state.name }
            </div>
            <h6>this number is coming from addtask { props.count }</h6>
            <AddSubTask cardState={state}/>
            <br/>
        </div>
    )
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(AddTaskCard);