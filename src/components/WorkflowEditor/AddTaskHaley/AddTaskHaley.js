import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Switch, Route, useRouteMatch } from 'react-router-dom';

import AddTask0 from './subcomponents/AddTask0';
import AddTask1 from './subcomponents/AddTask1';
import AddTask2 from './subcomponents/AddTask2';
import AddTask3 from './subcomponents/AddTask3';
import AddTask4 from './subcomponents/AddTask4';
import AddTask5 from './subcomponents/AddTask5';
import AddTask6 from './subcomponents/AddTask6';
import AddTaskSummary from './subcomponents/AddTaskSummary'

function AddTask(props) {
    let { path, url } = useRouteMatch();
    return (
        <>
            <h2>Add Task Simulator</h2>
            <Switch>
                <Route exact path={`${path}`}><AddTask0/></Route> 
                <Route path={`${path}/1`} component={AddTask1} />
                <Route path={`${path}/2`} component={AddTask2} />
                <Route path={`${path}/3`} component={AddTask3} />
                <Route path={`${path}/4`} component={AddTask4} />
                <Route path={`${path}/5`} component={AddTask5} />
                <Route path={`${path}/6`} component={AddTask6} />
            </Switch>
            <AddTaskSummary/>
        </>
    );
}


const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(AddTask);

