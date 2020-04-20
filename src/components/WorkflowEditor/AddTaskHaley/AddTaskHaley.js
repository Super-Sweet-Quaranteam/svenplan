import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Switch, Route, useRouteMatch } from 'react-router-dom';

import AddTask0 from './subcomponents/AddTask0';
import AddTask1 from './subcomponents/AddTask1';
import AddTask2 from './subcomponents/AddTask2';
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
            </Switch>
            <AddTaskSummary/>
        </>
    );
}


const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(AddTask);

