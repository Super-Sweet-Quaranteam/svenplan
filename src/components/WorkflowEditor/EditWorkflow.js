import React, {Component} from 'react';
import {connect} from 'react-redux';
import EditPhase from './EditPhase';
import CreateWorkflow from './CreateWorkflow';


class EditWorkflow extends Component {

    state={
        showPhase:false
    }

    //allows for adding a new phase - handled in EditPhase,js
    addPhase=()=>{
        if(this.state.showPhase === true){
            this.setState({showPhase: !this.state.showPhase})
        }
        this.props.dispatch({type: 'TOGGLE_ADD_PHASE'});
    }

    //allows for editing a workflow - handled in CreateWorkflow,js
    editWorkflow=()=>{
        this.props.dispatch({type: 'TOGGLE_EDIT_WORKFLOW'});
    }

    // gets current phase by id to be displayed below - handled in EditPhase.js
    viewPhase=(id)=>{
        this.props.dispatch({type: 'GET_THIS_PHASE', payload:{id:id}});
        //this is the same as above, just taken from haleys code because it's already working with other parts- should consolidate
        this.props.dispatch({ type: 'SET_TASK_PHASE_ID', payload: id })
        this.setState({showPhase: !this.state.showPhase})
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
                                        <li key={phase.ph_sequence} data-id={phase.ph_id} className="phase-block" onClick={()=>this.viewPhase(phase.ph_id)}>
                                            <div className="phase-text">{phase.ph_name}</div>
                                            <br/>
                                            <div className="phase-text">{phase.ph_description}</div>
                                        </li>
                                    )}
                            </nav>
                        }
                        </>
                    }
                    {this.props.reduxState.workflow.storeCurent.editWorkflow === true && <CreateWorkflow/>}
                    {this.props.reduxState.workflow.storeCurent.addPhase === true && <EditPhase/>}
                    {this.state.showPhase === true && <EditPhase/>}
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