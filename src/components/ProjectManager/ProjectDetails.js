import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../SubscriberHome/Subscriber.css';

class CurrentWorkflow extends Component {
    state = {
        task: null,
        taskIndex: 0
    }  
    backATask=()=>{
        this.props.dispatch({ type: 'FETCH_INFORMATION_TO_DISPLAY', payload: { defaultTaskId: this.props.reduxState.subscriber.tasksInPhase[this.state.taskIndex - 1].id } }) 
        this.setState({
            task: this.props.reduxState.subscriber.tasksInPhase[this.state.taskIndex - 1],
            taskIndex: this.state.taskIndex - 1
        })
    }
    componentDidMount(){
        this.props.dispatch({type: 'FETCH_CURRENT_WORKFLOW', payload: this.props.reduxState.subscriber.projectId.id});
        // this fetch assumes all that's needed to fetch the right things to display is the default task Id -hardcoded currently
        // this.props.dispatch({ type: 'FETCH_INFORMATION_TO_DISPLAY', payload: { defaultTaskId: 17 }})               
    }
    forwardATask=()=>{
        this.props.dispatch({ type: 'FETCH_INFORMATION_TO_DISPLAY', payload: { defaultTaskId: this.props.reduxState.subscriber.tasksInPhase[this.state.taskIndex+1].id } }) 
        this.setState({
            task: this.props.reduxState.subscriber.tasksInPhase[this.state.taskIndex + 1],
            taskIndex: this.state.taskIndex + 1
        })
    }

    saveButton=()=>{
        this.props.dispatch({
            type: 'SAVE_INPUTS', payload: this.state
        })
    }

    handleChange=(event, id)=>{
        let valueId=Number(event.target.name)
        this.setState({taskId:id,
            projectId: this.props.reduxState.subscriber.projectId.id,
            [valueId]:event.target.value})
                    console.log(this.state)
    }


    // index of task from tasksInPhase will always start at 0 (first task in list)
    // this.state.taskIndex instead of 0 helps code remember which task we're currently on
    showTasks=(phaseId)=>{
        console.log('you clicked a phase', phaseId);
        // passing function in payload so sagas can run it async.
        this.props.dispatch({type: 'FETCH_PHASES_TASKS', payload: {phaseId: phaseId, callback: () => {
            this.props.dispatch({ type: 'FETCH_INFORMATION_TO_DISPLAY', payload: { defaultTaskId: this.props.reduxState.subscriber.tasksInPhase[0].id } }) 
            this.setState({
                task: this.props.reduxState.subscriber.tasksInPhase[0],
                taskIndex: 0
            })
        }}})
    }

    render() {
        return (
            <div className='CurrentWorkflow'>
                <h2>{this.props.reduxState.subscriber.projectId.name}</h2>
                {/* button to take user back to existing projects */}
                <button className="nav-item" onClick={()=>this.props.dispatch({type: 'CLIENT_DISPLAY', payload: {displayOldWorkFlow: true}})}>
                        <a className="nav-link" href="#/projects">Back</a>
                </button>
                {/* phase divs are set up as buttons for a11y. onClick, specific tasks show up */}
                <div className="phaseOverview">
                    {this.props.reduxState.subscriber.currentProject.map(phase => 
                        <button className="phaseOverviewItem" key={phase.phase_id} onClick={()=>this.showTasks(phase.phase_id)}>{phase.phase_name}</button>
                    )}
                </div>
                <div className="taskWindow">
                {this.state.task && <div className="taskAtHand" key={this.state.task.id}>
                        <h3>{this.props.reduxState.project.taskDetails.name}</h3>
                        <h4>{this.props.reduxState.project.taskDetails.description}</h4>
                            <br/>


                     <form>
                            {this.props.reduxState.project.taskDetails.links &&
                            <>
                                {this.props.reduxState.project.taskDetails.links.length !== 0 &&
                                <>
                            <h4>Relevant Links:</h4>
                                {this.props.reduxState.project.taskDetails.links.map(link =>
                                <>
                                    <a href={link.url}>{link.textToShow}</a>
                                    <br/>
                                    </>
                                )}
                                </>
                                }
    
                                    </>
                            }   
                            <br/>
                        
                        {this.props.reduxState.project.taskDetails.inputs &&
                            this.props.reduxState.project.taskDetails.inputs.map((input, i)=>
                                
                           <>
                           {
                                input.inputType === 'button' ?
                                    <>
                                        <label>{input.prompt}</label>
                                        <br/>
                                                <input onClick={(event) => this.handleChange(event, this.props.reduxState.project.taskDetails.id)} value={this.state[input.inputId] || 'Mark Complete'} name={input.inputId} type="button"></input>
                                    </>
                             
                                : input.inputType === 'number' ?
                                    <>
                                                            <label>{input.prompt}</label>
                                        <br/>
                                                    <input onChange={(event) => this.handleChange(event, this.props.reduxState.project.taskDetails.id)} value={this.state[input.inputId] || ''} name={input.inputId} type="number"></input>
                                    </>                            
                               
                                : input.inputType === 'text' ?
                                    <>
                                                                        <label>{input.prompt}</label>                            
                                        <br/>
                                                                        <input onChange={(event)=>this.handleChange(event, this.props.reduxState.project.taskDetails.id)} value={this.state[input.inputId] || ''} name={input.inputId} type="text" placeholder={input.prompt}></input>
                                    </>
                                : <></>
                                
                           }
                           <br/>
                           <br/>
                            </>
                            )}
                        </form>
                            <br/>
                        {this.state.taskIndex === 0 & this.props.reduxState.subscriber.tasksInPhase.length === 1  ? 
                              <></>
                            :
                            <>
                                {this.state.taskIndex === 0 ?
                                // this.state.task === this.props.reduxState.subscriber.tasksInPhase[this.props.reduxState.subscriber.tasksInPhase.length-1] ?
                                    <button onClick={this.forwardATask}>Next</button>
                                    // <button onClick={this.backATask}>Back</button>
                                :
                                    <>
                                        {
                                         this.state.task === this.props.reduxState.subscriber.tasksInPhase[this.props.reduxState.subscriber.tasksInPhase.length-1] ?
                                            <>
                                            <button onClick={this.backATask}>Back</button>
                                                <button onClick={this.saveButton}>Save</button>
                                                    </>
                                            :
                                            <>
                                                <button onClick={this.backATask}>Back</button>
                                                <button onClick={this.forwardATask}>Next</button>
                                            </>
                                        }
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