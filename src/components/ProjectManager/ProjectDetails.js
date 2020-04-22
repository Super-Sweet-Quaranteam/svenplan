import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../SubscriberHome/Subscriber.css';

class CurrentWorkflow extends Component {
    state = {
        task: null,
        taskIndex: 0
    }  
    backATask=()=>{
        this.setState({
            task: this.props.reduxState.subscriber.tasksInPhase[this.state.taskIndex - 1],
            taskIndex: this.state.taskIndex - 1
        })
    }
    componentDidMount(){
        this.props.dispatch({type: 'FETCH_CURRENT_WORKFLOW', payload: this.props.reduxState.subscriber.projectId})               
    }
    forwardATask=()=>{
        this.setState({
            task: this.props.reduxState.subscriber.tasksInPhase[this.state.taskIndex + 1],
            taskIndex: this.state.taskIndex + 1
        })
    }
    // index of task from tasksInPhase will always start at 0 (first task in list)
    // this.state.taskIndex instead of 0 helps code remember which task we're currently on
    showTasks=(phaseId)=>{
        console.log('you clicked a phase', phaseId);
        // passing function in payload so sagas can run it async.
        this.props.dispatch({type: 'FETCH_PHASES_TASKS', payload: {phaseId: phaseId, callback: () => {
            this.setState({
                task: this.props.reduxState.subscriber.tasksInPhase[0],
                taskIndex: 0
            })
        }}})
    }

    render() {
        return (
            <div className='CurrentWorkflow'>
                <h2>this isn't doing anything because I just copied it from Currentworkflow without updating the reducers. was planning on using this.props.match.params.projectId to fetch selected project. the variable 'projectId' comes from the route path in App.js, and its value comes from the 'Continue' button clicked in ExistingProjects</h2>
                {/* button to take user back to existing projects */}
                <button className="nav-item" onClick={()=>this.props.dispatch({type: 'CLIENT_DISPLAY', payload: {displayOldWorkFlow: true}})}>
                        <a className="nav-link" href="#/clientHome">Back</a>
                </button>
                {/* phase divs are set up as buttons for a11y. onClick, specific tasks show up */}
                <div className="phaseOverview">
                    {this.props.reduxState.subscriber.currentProject.map(phase => 
                        <button className="phaseOverviewItem" key={phase.phase_id} onClick={()=>this.showTasks(phase.phase_id)}>{phase.phase_name}</button>
                    )}
                </div>
                <div className="taskWindow">
                {this.state.task && <div className="taskAtHand" key={this.state.task.id}>
                            <h3>{this.state.task.phase_name}</h3>
                            {this.state.task.phase_description}
                            <br/>


                            
                            <form>
                                {this.state.task.name === 'button' ?
                                    <>
                                        <label>{this.state.task.instructions}</label>
                                        <br/>
                                        <input type="button" value={this.state.task.description}></input>
                                    </>
                                : this.state.task.name === 'checkbox' ?
                                    <>
                                        <label>{this.state.task.instructions}</label>
                                        <br/>
                                        <input type="checkbox"></input>
                                    </>
                                : this.state.task.name === 'radio' ?
                                    <>
                                        <label>{this.state.task.instructions}</label>
                                        <br/>
                                        <input type="radio"></input>
                                    </>                            
                                : this.state.task.name === 'number' ?
                                    <>
                                        <label>{this.state.task.instructions}</label>
                                        <br/>
                                        <input type="number"></input>
                                    </>                            
                                : this.state.task.name === 'email' ?
                                    <>
                                        <label>{this.state.task.instructions}</label>
                                        <br/>
                                        <input type="email"></input>
                                    </>                            
                                : this.state.task.name === 'tel' ?
                                    <>
                                        <label>{this.state.task.instructions}</label>
                                        <br/>
                                        <input type="tel"></input>
                                    </>                            
                                : this.state.task.name === 'text' ?
                                    <>
                                        <label>{this.state.task.instructions}</label>                            
                                        <br/>
                                        <input type="text" placeholder={this.state.task.description}></input>
                                    </>
                                : this.state.task.name === 'url' ?
                                    <>
                                        <label>{this.state.task.instructions}</label>
                                        <br/>
                                        <input type="url"></input>
                                    </>
                                : <></>
                                }
                            </form>

                            <br/>
                            {this.state.taskIndex === 0 ? 
                                <button onClick={this.forwardATask}>Next</button>
                            :
                            <>
                                {this.state.task === this.props.reduxState.subscriber.tasksInPhase[this.props.reduxState.subscriber.tasksInPhase.length-1] ?
                                    <button onClick={this.backATask}>Back</button>
                                :
                                    <>
                                        <button onClick={this.backATask}>Back</button>
                                        <button onClick={this.forwardATask}>Next</button>
                                    </>
                                }
                            </>
                        }
                </div>}
                </div>
            </div>
        )
    }
}
const mapStateToProps = reduxState => ({
reduxState
});
export default connect(mapStateToProps)(CurrentWorkflow);