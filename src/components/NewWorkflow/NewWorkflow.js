import React, {Component} from 'react';
import {connect} from 'react-redux';
import './NewWorkflow.css'
import AddTask from '../AddTask/AddTask'

class NewWorkflow extends Component {
    state = {
        inputName: '',
        inputDescription: '',
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
    }
    handleChange=(event, typeOf)=>{                
        this.setState({
            [typeOf]: event.target.value
        })
    }
        render() {
        return (
            <div>
                <h3>New Workflow Home Below</h3>
                <div className="workflowInfo">
                {this.state.workflow.created ? 
                        <>
                            <h3>{this.state.workflow.name}</h3>
                            <p className="workflowDescription">{this.state.workflow.description}
                                <br/>                   
                                <button onClick={this.editWorkflow}>Edit</button>
                            </p>
                            <br/>
                        </>
                        :
                        <>
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
                        <button onClick={this.createWorkflow}>Create</button>
                        <br/>
                    </>
                }
                    {/* on btn click, a new phase is added to array, currently a taco string but maybe an array of tasks once add task component is set up */}
                    <button onClick={this.addPhase}>Add Phase</button>
                    <div className="phaseWrapper">
                        {this.state.workflow.phases.map(phase => <div className="phaseBlock"><AddTask></div>)}
                    </div>
                </div>                        
            </div>
        );
    }
}
const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(NewWorkflow);