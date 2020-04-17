import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Client.css';

class CurrentWorkflow extends Component {
    componentDidMount(){
        this.props.dispatch({type: 'FETCH_CURRENT_WORKFLOW'})               
    }
    showTasks=(phaseId)=>{
        console.log('you clicked a phase');
        this.props.dispatch({type: 'FETCH_PHASES_TASKS', payload: {phaseId: phaseId}})
    }
    render() {
        return (
            <div className='CurrentWorkflow'>
                <button className="nav-item" onClick={()=>this.props.dispatch({type: 'CLIENT_DISPLAY', payload: {displayOldWorkFlow: true}})}>
                        <a className="nav-link" href="#/clientHome">Back</a></button>
                <div className="phaseOverview">
                    {this.props.reduxState.subscriber.currentProject.map(phase => 
                        <button className="phaseOverviewItem" onClick={()=>this.showTasks(phase.id)}>{phase.name}</button>
                        )}
                </div>
                <div className="taskWindow">
                    {/* will also need to populate from reduxState */}
                    <div className="taskAtHand">(filler)Task Window
                        <br/>
                        tasks, check boxes, tutorials, etc will go in this window
                        <br/>
                        <button>Back</button>
                        <button>Next</button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = reduxState => ({
reduxState
});
export default connect(mapStateToProps)(CurrentWorkflow);