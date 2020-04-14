import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import AddTaskCard from './AddTaskCard';

const AddTask =(props)=>{

    const [count, setCount] = useState(0);

    const [displayCard, setDisplayCard] = useState(false);
    

    useEffect(()=>{         
    //    console.log( `You clicked ${count} times`);
    }, [count])
    
    return (
        <div className="addTask">
            <h1>Add a New Task</h1>
            <button className="button" onClick={()=>setCount(count + 1)} >+</button>
            <button className="button" onClick={()=>setDisplayCard(!displayCard)}>display card</button>
            <h6>hitting + will add a count to another component</h6>

            <div>
                {displayCard
                ? 
                <AddTaskCard count={count}/> 
                : 
                <p>****click button to add task card****</p>}
            </div>
           <h2>footer? graphs? logo? remove?</h2>
        </div>
    )
}

const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(AddTask);