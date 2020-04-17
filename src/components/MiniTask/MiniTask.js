import React, {Component} from 'react';



class MiniTask extends Component {
state={}

taskSelect=(e)=>{
console.log('target value', e.target.value);
this.setState({taskType:e.target.value,
                taskText:''})
}
taskText = (e) => {
        console.log('target value', e.target.value);
        this.setState({ taskText: e.target.value, })
}

render(){
    return (
        <>
           
            <label htmlFor="miniTask">Choose a task type:</label>

            <select onChange={this.taskSelect} id="miniTask">
                <option value="default"></option>
                <option value="Input">Input</option>
                <option value="Instruction">Instruction</option>
               
            </select>
            <label htmlFor='taskText'>What is this task labeled?</label>
            <input id='taskText' onChange={this.taskText} placeholder="Task Text"></input>
<br></br>
            {this.state.taskType === 'Input' && 
            <div>
            <label htmlFor='task'>{this.state.taskText}</label>
            <input id='task' placeholder="your Task"></input>
            <button>Add Task to Phase</button>
            </div>}
            {this.state.taskType === 'Instruction' &&
                <div>
                <p>{this.state.taskText}</p>
                    <button>Add Instruction to Phase</button>
                </div>}
        </>
    );
}
}

export default MiniTask;
