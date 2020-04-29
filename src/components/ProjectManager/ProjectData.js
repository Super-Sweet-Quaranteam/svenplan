import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ProjectData extends Component {
    // subscriber-side code. When 'Existing Projects' is clicked, page loads table of project, 
    // status and option for subscriber to continue or archive project
  

    render() {
        return (
            <>
                <h2>{this.props.reduxState.subscriber.projectId.name} Data</h2>
                <table className="tbl-sml">
                    <thead>
                        <tr>
                            <th>Phase</th>
                            <th>Task</th>
                            <th>Input</th>
                            <th>Value</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reduxState.subscriber.projectData  &&
                        this.props.reduxState.subscriber.projectData.map(data =>
                            <tr key={data.id}>
                                <td>{data.phaseName}</td>
                                <td>{data.taskName}</td>
                                <td>{data.inputPrompt}</td>
                                <td>{data.value}</td>
                            </tr>)}
                    </tbody>
                </table>
            </>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(withRouter(ProjectData));
