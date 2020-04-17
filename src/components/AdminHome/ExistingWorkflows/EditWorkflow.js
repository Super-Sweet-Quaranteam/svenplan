import React, {Component} from 'react';
import {connect} from 'react-redux';
import WorkflowEditNav from './WorkflowEditNav';
import EditPhase from './EditPhase';


class EditWorkflow extends Component {

    state = {
        phaseName: null,
        edit: false,
        editPhase: false,
        workflow: {
            id: this.props.wf.id,
            name: this.props.wf.name,
            description: this.props.wf.description,
            time: new Date()
        }
    }

    editWorkflow=()=>{
        this.setState({edit: true})
    }

    editPhase=()=>{
        this.setState({editPhase: true})
    }

    handleChange=(event, propertyName)=>{                
        this.setState({
            workflow:{
                ...this.state.workflow,
                [propertyName]: event.target.value
            }
        })
    }

    save=()=>{
        this.setState({edit:false})
        this.props.dispatch({type: 'EDIT_WORKFLOW_NAME', payload: this.state.workflow})
    }

    render() {
        return (
            <div className="workflowWrapper">
                <div className="workflowInfo">
                    {this.state.edit === true
                    ?
                    <>
                        <hr/>
                        <label> Workflow Name:
                            <br/>
                            <input defaultValue={this.state.workflow.name} onChange={(event)=>this.handleChange(event, "name")}></input>
                        </label> 
                        <br/>
                        <label> Description:
                            <br/>
                            <textarea rows="5" defaultValue={this.state.workflow.description} onChange={(event)=>this.handleChange(event, "description")}></textarea>
                        </label>  
                        <br/>                   
                        <button className="button" onClick={this.save}>Save</button>
                        <br/>
                    </> 
                    :
                    <>
                        <WorkflowEditNav publish={this.saveWorkflow} name={this.state.workflow.name} editWorkflow={this.editWorkflow}/>
                            <h3 className="workflowDescription">{this.state.workflow.description}
                                <br/> 
                                <button className="button" onClick={this.addPhase}>Add Phase</button>                  
                            </h3>
                            <br/>
                        {this.props.reduxState.workflow.thisPhase &&
                        <>
                        {this.props.reduxState.workflow.thisPhase[0] &&
                            <>
                                <h1>{this.props.reduxState.workflow.thisPhase[0].ph_name}</h1>
                                <button className="button" onClick={this.editPhase}>Edit Phase</button> 
                            </>
                        }
                        
                            <div className="phaseWrapper">
                                {this.props.reduxState.workflow.thisPhase.map((phase, i )=> 
                                <EditPhase 
                                    key={i}
                                    phase={phase.ph_name}
                                    name={phase.task_name}
                                    description={phase.task_description}
                                    edit={this.state.editPhase}
                                />
                                )}
                            </div>
                        </>
                        }
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
export default connect(mapStateToProps)(EditWorkflow);