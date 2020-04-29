import React, {Component} from 'react';
import {connect} from 'react-redux';
import EditPhase from './EditPhase';
import CreateWorkflow from './CreateWorkflow';


class EditWorkflow extends Component {

    state={
        active: false
    }

    // allows for adding a new phase - handled in EditPhase,js
    addPhase=()=>{
        if(this.props.reduxState.workflow.storeCurent.showPhase === true){
            this.props.dispatch({type: 'TOGGLE_SHOW_PHASE'});
        }
        this.props.dispatch({type: 'TOGGLE_ADD_PHASE'});
    }

    //allows for editing a workflow - handled in CreateWorkflow,js
    editWorkflow=()=>{
        this.props.dispatch({type: 'TOGGLE_EDIT_WORKFLOW'});
        if(this.props.reduxState.workflow.storeCurent.showPhase === true){
            this.props.dispatch({type: 'TOGGLE_SHOW_PHASE'});
        }
        if(this.props.reduxState.workflow.storeCurent.editPhase === true){
            this.props.dispatch({type: 'TOGGLE_EDIT_PHASE'});
        }
        if(this.props.reduxState.workflow.storeCurent.addPhase === true){
            this.props.dispatch({type: 'TOGGLE_ADD_PHASE'});
        }
    }

    // gets current phase by id to be displayed below - handled in EditPhase.js
    viewPhase=(e, id)=>{
        this.props.dispatch({type: 'GET_THIS_PHASE', payload:{id:id}});
        //this is the same as above - should consolidate
        this.props.dispatch({ type: 'SET_TASK_PHASE_ID', payload: id })
        this.props.dispatch({type: 'TOGGLE_SHOW_PHASE'});

    }

    render() {
        return (
            <div className="workflowWrapper">
                {this.props.reduxState.workflow.storeCurent.workflow &&
                <>
                    <div className="side-button"><button className="btn-sml" onClick={this.editWorkflow}>Edit</button></div>
                    <h1 className="workflowDescription">{this.props.reduxState.workflow.storeCurent.workflow.name}</h1>
                    <h3 className="workflowDescription">{this.props.reduxState.workflow.storeCurent.workflow.description}</h3>
                    {this.props.reduxState.workflow.thisWorkflow &&
                        <>
                        {this.props.reduxState.workflow.storeCurent.editWorkflow === false && 
                            <nav className="workflowInfo">
                                <li className="phase-block-btn" onClick={this.addPhase}>
                                    Add New Phase
                                </li>
                                    {this.props.reduxState.workflow.thisWorkflow.map(phase=>
                                        <li key={phase.ph_sequence} data-id={phase.ph_id} className={"phase-block"} onClick={(e)=>this.viewPhase(e, phase.ph_id)}>
                                            <div className="phase-text"><div className="seq">{phase.ph_sequence}</div>{phase.ph_name}</div>
                                            <br/>
                                            <div className="phase-text">{phase.ph_description}</div>
                                        </li>
                                    )}
                            </nav>
                        }
                        </>
                    }
                    {/* renders add / edit phase, and edit workflow*/}
                    {this.props.reduxState.workflow.storeCurent.editWorkflow === true && <CreateWorkflow/>}
                    {this.props.reduxState.workflow.storeCurent.addPhase === true && <EditPhase/>}
                    {this.props.reduxState.workflow.storeCurent.showPhase === true && <EditPhase/>}
                </>
                }
            </div>
        );
    }
}



const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(EditWorkflow);