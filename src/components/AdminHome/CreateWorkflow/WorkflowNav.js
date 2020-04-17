import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../AdminHome.css'


class WorkflowNav extends Component {


    componentDidMount=()=>{

    }


    render() {
        return (
            <nav className="sidebar-nav">
                <ul className="side-nav">
                    <li className="workflow-name">{this.props.name}
                        <span className="side-item"><button className="button" onClick={this.props.editWorkflow}>Edit</button></span>
                    </li>
                    {this.props.reduxState.admin.newPhase &&
                        this.props.reduxState.admin.newPhase.map((phase, i)=>
                            <li key={i} data-id={i+1} className="side-item">{phase.name}
                                <span className="span"><button className="btn-sml" onClick={this.editWorkflow}>Edit</button></span>
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