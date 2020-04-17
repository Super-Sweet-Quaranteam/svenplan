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
                        <span className="side-item"><button className="button" onClick={this.props.editWorkflow}>Edit Title</button></span>
                    </li>
                    {this.props.reduxState.workflow.thisWorkflow &&
                        this.props.reduxState.workflow.thisWorkflow.map(phase=>
                            <li key={phase.ph_sequence} data-id={phase.ph_sequence} className="side-item" onClick={()=>this.viewTasks(phase.ph_sequence)}>{phase.ph_name}
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