import React, {Component} from 'react';
import {connect} from 'react-redux';
import EditPhase from './EditPhase';
import CreateWorkflow from './CreateWorkflow';


class EditWorkflow extends Component {

    state = {
        edit: false,
        editPhase: false,
        addPhase: false,
        time: new Date()
    }

    //allows for adding a new phase - handled in EditPhase,js
    addPhase=()=>{
        this.setState({addPhase: true});
    }

    //allows for editing a workflow - handled in CreateWorkflow,js
    editWorkflow=()=>{
        this.setState({edit: !this.state.edit})
    }

    // gets current phase by id to be displayed below - handled in EditPhase.js
    viewPhase=(id)=>{
        this.props.dispatch({type: 'GET_THIS_PHASE', payload:{id:id}});
        this.setState({editPhase:true});
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
                    {this.state.editPhase === true &&
                        <EditPhase
                        />
                    }
                    {this.state.addPhase === true &&
                        <EditPhase
                            addPhase={this.state.addPhase}
                        />
                    }
                    {this.state.edit === true &&
                        <CreateWorkflow
                            edit={this.state.edit}
                        />
                    }
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