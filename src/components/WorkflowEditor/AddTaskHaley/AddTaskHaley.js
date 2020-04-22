import React from 'react';
import { connect } from 'react-redux';
// import { HashRouter as Switch, Route, useRouteMatch } from 'react-router-dom';

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
    return (
        <>
            <h2>Add Task Simulator</h2>

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
    taskStep: state.task.stepOfTaskCreation
});

export default connect(mapStateToProps)(AddTask);

