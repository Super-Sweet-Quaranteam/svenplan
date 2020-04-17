import React, {Component} from 'react';
import {connect} from 'react-redux';
import WorkflowNav from './WorkflowNav';
import AddPhase from './AddPhase';


class CreateWorkflow extends Component {

    state = {
        inputName: null,
        inputDescription: '',
        time: new Date(),
        workflow: {
            created: false,
            number: 0,
            name: '',
            description: '',
            phases: [],
        }
    }
    addPhase=()=> {
        this.setState({
            workflow: {
                ...this.state.workflow,
                phases: [...this.state.workflow.phases, "phase"]
            }
        })
    }
    editWorkflow=()=>{
        this.setState({
            workflow: {
                ...this.state.workflow,
                created: false,
            }
        })
    }
    createWorkflow=()=>{ 
        this.setState({
            workflow:{
                ...this.state.workflow,
                created: true,
                name: this.state.inputName,
                description: this.state.inputDescription
            }
        })
        this.props.dispatch({type: 'ADD_WORKFLOW', payload: {
            workflowName: this.state.inputName, description: this.state.inputDescription, time: this.state.time}})
        
        
    }
    //handles text input, saves in state w/o displaying on dom
    handleChange=(event, typeOf)=>{                
        this.setState({
            [typeOf]: event.target.value
        })
    }
    //POST dispatch, sends whole workflow obj as payload. rn this is the only thing that saves to db
    saveWorkflow=()=>{
        this.props.dispatch({type: 'PUBLISH_WORKFLOW', payload: this.props.reduxState.admin.NewWorkflow})
    }

    render() {
        return (
            <div className="workflowWrapper">
                <div className="workflowInfo">
                {/* conditional rendering on input fields vs title and description */}
                    {this.state.workflow.created 
                    ? 
                    <>
                        <WorkflowNav publish={this.saveWorkflow} name={this.state.workflow.name} editWorkflow={this.editWorkflow}/>
                            <h3 className="workflowDescription">{this.state.workflow.description}
                                <br/> 
                                <button className="button" onClick={this.addPhase}>Add Phase</button>                  
                            </h3>
                            <br/>
                        {this.state.workflow.created === true &&
                        <>
                            <div className="phaseWrapper">
                                {this.state.workflow.phases.map((phase, i )=> <div key={i} data-id={i} className="phaseBlock"><AddPhase data={i} phase={this.state}/></div>)}
                            </div>
                        </>
                        }
                    </>
                    :
                    <>
                        <hr/>
                        <label> Workflow Name:
                            <br/>
                            <input defaultValue={this.state.workflow.name} onChange={(event)=>this.handleChange(event, "inputName")}></input>
                        </label> 
                        <br/>
                        <label> Description:
                            <br/>
                            <textarea defaultValue={this.state.workflow.description} onChange={(event)=>this.handleChange(event, "inputDescription")}></textarea>
                        </label>  
                        <br/>                   
                        <button className="button" onClick={this.createWorkflow}>Create</button>
                        <br/>
                    </>
                    }
                </div>                        
            </div>
        );
    }
}


const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(CreateWorkflow);
