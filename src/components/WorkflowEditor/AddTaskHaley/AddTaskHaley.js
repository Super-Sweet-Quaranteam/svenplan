import React from 'react';
import { connect } from 'react-redux';
// import { HashRouter as Switch, Route, useRouteMatch } from 'react-router-dom';
import Swal from "sweetalert2"

// import AddTask0 from './subcomponents/AddTask0';
import AddTask1 from './subcomponents/AddTask1';
import AddTask2 from './subcomponents/AddTask2';
import AddTask3 from './subcomponents/AddTask3';
import AddTask4 from './subcomponents/AddTask4';
import AddTaskReview from './subcomponents/AddTaskReview';

// import AddTask5 from './subcomponents/AddTask5';
// import AddTask6 from './subcomponents/AddTask6'; 
// import AddTask7 from './subcomponents/AddTask7';
// import AddTask8 from './subcomponents/AddTask8';
// import AddTaskSummary from './subcomponents/AddTaskSummary'

function AddTask(props) {
    // let { path, url } = useRouteMatch();
    const deleteTask=()=>{
        Swal.fire({
            title: `Are you sure you want to delete this task?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.value) {
                Swal.fire(
                'Deleted!',
                `This Task has been removed from this Phase`,
                'success'
                );
                props.dispatch({type: 'REMOVE_TASK', payload: {
                    id: props.phase.id, 
                    task: props.taskID
                }});
                props.dispatch({ type: 'GO_HOME_STEP' });
                if(props.edit === true){
                    props.dispatch({type: 'TOGGLE_EDIT_TASK'});
                }
                if(props.add === true){
                    props.dispatch({type: 'TOGGLE_ADD_TASK'});
                }
            }
        })
    }

    return (
        <>
            <h2>Add Task To Phase</h2>
           {props.edit === true && 
                <div className="side-button" onClick={deleteTask}><button className="btn-sml-delete">Delete Task</button></div>
           }
            
            {props.taskStep === 1 && <AddTask1 />}
            {props.taskStep === 2 && <AddTask2 />}
            {props.taskStep === 3 && <AddTask3 />}
            {props.taskStep === 4 && <AddTask4 />}
            {props.taskStep === 5 && <AddTaskReview />}

            {/* <Switch>
                <Route exact path={`${path}`}><AddTask0/></Route> 
                <Route path={`${path}/1`} component={AddTask1} />
                <Route path={`${path}/2`} component={AddTask2} />
                <Route path={`${path}/3`} component={AddTask3} />
                <Route path={`${path}/4`} component={AddTask4} />
                <Route path={`${path}/5`} component={AddTask5} />
                <Route path={`${path}/6`} component={AddTask6} />
                <Route path={`${path}/7`} component={AddTask7} />
                <Route path={`${path}/8`} component={AddTask8} />
            </Switch>
            <AddTaskSummary/> */}
        </>
    );
}


const mapStateToProps = state => ({
    user: state.user,
    task: state.task.taskInProgress,
    taskStep: state.task.stepOfTaskCreation,
    phase: state.workflow.storeCurent.phase,
    taskID: state.workflow.storeCurent.task,
    edit: state.workflow.storeCurent.editTask,
    add: state.workflow.storeCurent.addTask 
});

export default connect(mapStateToProps)(AddTask);

