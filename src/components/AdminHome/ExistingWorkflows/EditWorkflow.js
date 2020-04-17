import React, {Component} from 'react';
import {connect} from 'react-redux';
import WorkflowEditNav from './WorkflowEditNav';
import EditPhase from './EditPhase';


class EditWorkflow extends Component {

    state = {
        time: new Date(),
        workflow: {
            edit: false,
            id: this.props.wf.id,
            name: this.props.wf.name,
            description: this.props.wf.description
        }
    }
    // addPhase=()=> {
    //     this.setState({
    //         workflow: {
    //             ...this.state.workflow,
    //             phases: [...this.state.workflow.phases, "phase"]
    //         }
    //     })
    // }
    // editWorkflow=()=>{
    //     this.setState({
    //         workflow: {
    //             ...this.state.workflow,
    //             edit: true,
    //         }
    //     })
    // }
    // keepWorkflow=()=>{ 
    //     this.setState({
    //         workflow:{
    //             ...this.state.workflow,
    //             edit: false,
    //             name: this.state.inputName,
    //             description: this.state.inputDescription
    //         }
    //     })
    //     this.props.dispatch({type: 'ADD_WORKFLOW', payload: {
    //         workflowName: this.state.inputName, description: this.state.inputDescription, time: this.state.time}})
        
        
    // }
    // //handles text input, saves in state w/o displaying on dom
    // handleChange=(event, typeOf)=>{                
    //     this.setState({
    //         [typeOf]: event.target.value
    //     })
    // }
    // //POST dispatch, sends whole workflow obj as payload. rn this is the only thing that saves to db
    // saveWorkflow=()=>{
    //     this.props.dispatch({type: 'PUBLISH_WORKFLOW', payload: this.props.reduxState.admin.NewWorkflow})
    // }

    render() {
        return (
            <div className="workflowWrapper">
                <div className="workflowInfo">
                    {this.state.workflow.edit
                    ?
                    <>
                        <hr/>
                        <label> Workflow Name:
                            <br/>
                            <input defaultValue={this.props.wf.name} onChange={(event)=>this.handleChange(event, "inputName")}></input>
                        </label> 
                        <br/>
                        <label> Description:
                            <br/>
                            <textarea rows="5" defaultValue={this.props.wf.description} onChange={(event)=>this.handleChange(event, "inputDescription")}></textarea>
                        </label>  
                        <br/>                   
                        <button className="button" onClick={this.keepWorkflow}>Keep</button>
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
                        {this.state.workflow.edit === true &&
                        <>
                            <div className="phaseWrapper">
                                {this.props.reduxState.workflow.thisWorkflow.map((phase, i )=> <div key={i} data-id={i} className="phaseBlock"><EditPhase data={i} phase={this.state}/></div>)}
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