import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import AddSubTask from './AddSubTask';

const AddTaskCard=(props)=>{
    
    const [displaySub, setDisplaySub] = useState(false);

    const [time, setTime] = useState(new Date())

    const [state, setState] = useState({name: 'new task'})

    const changeTime=()=>{
        setTime(new Date())
    }

    const handleChange=(e)=>{
        setState({
            name: e.target.value,
            time: new Date().toLocaleTimeString()
        });
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        props.dispatch({type: 'SENDING_NAME', payload: state})
    }

    useEffect(()=>{
        const tick = setInterval(()=>{
            changeTime()
        }, 1000)
        return ()=>clearInterval(tick)
    })

    return (
        <div className="taskCard">
            <hr/>
            <h1>This Card is inserted into AddTask component</h1>
            
            <form onSubmit={handleSubmit}>
                <input type="text" name="typeHere" value={state.name} onChange={(e)=>handleChange(e)}/>
                <input type="submit" value={time.toLocaleTimeString()} className="button"/>
            </form>
            <div>
                {state.name}
            </div>
            <h6>this number is coming from addtask <strong>{props.count}</strong></h6>
            <button className="button" onClick={()=>setDisplaySub(!displaySub)}>display sub-task</button>
                {displaySub
                ? 
                <AddSubTask cardState={state}/>
                : 
            <p>****click button to add sub-task****</p>}
            <br/>
        </div>
    )
}

const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(AddTaskCard);