import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../AdminHome.css'


class WorkflowNav extends Component {


    viewTasks=(id)=>{
        console.log(id)
        this.props.dispatch({type: 'GET_THIS_PHASE', payload:{id:id}});
    }


    render() {
        return (
            <nav className="sidebar-nav">
                <ul className="side-nav">
                    <li className="workflow-name">{this.props.name}
                        <button className="btn-sml" onClick={this.props.editWorkflow}>Edit Title</button>
                        <button className="btn-sml" onClick={this.props.add}>Add Phase</button>
                    </li>
                    {this.props.reduxState.workflow.thisWorkflow &&
                        this.props.reduxState.workflow.thisWorkflow.map(phase=>
                            <li key={phase.ph_sequence} data-id={phase.ph_id} className="side-item" onClick={()=>this.viewTasks(phase.ph_id)}>
                                {phase.ph_name}
                            </li>
                        )
                    }
                    <li>
                        <span className="span"><button className="button" onClick={this.props.saveWorkflow}>Publish Workflow</button></span>
                    </li>

                    <li className="side-item final">
                        <span>need help?</span>
                    </li>
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(WorkflowNav);