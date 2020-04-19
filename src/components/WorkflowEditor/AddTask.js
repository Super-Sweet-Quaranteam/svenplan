import React, {Component} from 'react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';


/////////////currently unused component!

class AddTask extends Component {
    
    // holds an array of what is to be displayed
    displayTask = [];

    state={
        showdata: this.displayTask,
        post: [],
        displaySub: false,
        time: new Date(),
        name: 'new task'
    }

    handleChange=(e)=>{
        this.setState({
            post: e.target.value,
            name: e.target.value,
            time: new Date()
        });
    }

    // currently sends state to no where, will update with relevant data
    // handleSubmit=(e)=>{
    //     e.preventDefault();
    //     this.displayTask.push(<div key={Math.random()} className="subtask-display">
    //        <strong>{this.state.post}</strong><br/><button className="button" 
    //             onClick={(e)=>this.editTask(e)}>
    //             edit</button></div>);
    //     this.setState({
    //         showdata: this.displayTask,
    //         post: ""
    //     });
    //     this.props.dispatch({type: 'ADD_TASK', payload: this.state})
    // }


    handleSubmit=(e)=>{
        Swal.fire({
            title: 'Add a new task to curent phase',
            input: 'text',
            showCancelButton: true,
            confirmButtonColor: '#014AAD',
            cancelButtonColor: '#EC1515',
            confirmButtonText: 'Next &rarr;',
          }).then((result) => {
            if (result.value) {
              Swal.fire({
                title: result.value,
                text: "add optional steps to task",
                input: 'select',
                inputOptions: {
                    nothing: 'no options needed',
                    button: 'click a button',
                    checkbox: 'add a checkbox',
                    radio: 'select one option from list',
                    email: 'enter an email',
                    url: 'enter a url'
                  },
                inputPlaceholder: 'Select an option',
                showCancelButton: true,
                confirmButtonColor: '#014AAD',
                cancelButtonColor: '#EC1515',
              }).then((option) => {
                if (option) {
                    Swal.fire({
                        title: 'keept this task?',
                        text: `${result.value} with ${option.value}`,
                        showCancelButton: true,
                        confirmButtonColor: '#014AAD',
                        cancelButtonColor: '#EC1515',
                        confirmButtonText: 'keep'
                    })}
                    return(option)
                }).then((keep) => {
                    if (keep.value) {
                        this.displayTask.push({post: {
                            taskName: result.value,
                            taskOption: keep.value,
                            time: new Date()
                        }})
                        this.setState({
                            showdata: this.displayTask,
                            post: [...this.state.post, {
                                taskName: result.value,
                                taskOption: keep.value,
                                time: new Date()
                            }]
                     });
                }})
            }
          })


    }

    // //this is not the appropriate data to publish full workflow
    // publish=()=>{
    //     this.props.dispatch({type: 'PUBLISH_TASK', payload: this.displayTask})
    // }

    render() {
        console.log(this.displayTask)
        return (
            <div data-id={this.props.data} className="taskCard">
                <hr/>
                {/* <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Add Task Name" value={this.state.post} onChange={(e)=>this.handleChange(e)}/>
                    <input type="submit" value="save" className="button"/>
                </form>*/}
                <button className="button" onClick={this.handleSubmit}>Add Task</button> 
                {this.displayTask &&
                    <div className="taskContainer">
                    {this.displayTask.map((task, i )=> 
                        <div key={i} data-id={i} className="subtask-display">
                            <strong>{task.post.taskName}</strong><br/>{task.post.taskOption}<button className="button" 
                                onClick={(e)=>this.editTask(e)}>
                                edit</button>
                        </div>)}
                    </div>
                }
                {/* <button className="button" onClick={this.publish}>Publish</button> */}

                <br/>
            </div>
        );
    }
}


const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(AddTask);