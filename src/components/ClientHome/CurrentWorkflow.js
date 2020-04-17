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
    selectTask=()=>{
        
    }
    render() {
        return (
            <div className='CurrentWorkflow'>
                {/* button to take user back to existing projects */}
                <button className="nav-item" onClick={()=>this.props.dispatch({type: 'CLIENT_DISPLAY', payload: {displayOldWorkFlow: true}})}>
                        <a className="nav-link" href="#/clientHome">Back</a>
                </button>
                {/* phase divs are set up as buttons for a11y. onClick, specific tasks show up */}
                <div className="phaseOverview">
                    {this.props.reduxState.subscriber.currentProject.map(phase => 
                        <button className="phaseOverviewItem" key={phase.id} onClick={()=>this.showTasks(phase.id)}>{phase.name}</button>
                    )}
                </div>
                <div className="taskWindow">
                    {this.props.reduxState.subscriber.tasksInPhase.map(task =>
                        <div className="taskAtHand" key={task.id}>{task.name}
                            <br/>
                            {task.description}
                            <br/>
                            Will also include checkboxes, tutorials, etc
                            <br/>
                            <button>Back</button>
                            <button>Next</button>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
const mapStateToProps = reduxState => ({
reduxState
});
export default connect(mapStateToProps)(CurrentWorkflow);