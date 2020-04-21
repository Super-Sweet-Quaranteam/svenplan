import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewProject extends Component {
    // subscriber-side code. When 'Existing Projects' is clicked, page loads table of project, status and option for subscriber to continue or archive project
    archiveProject = () => {
        console.log('archive btn clicked');
    }
    componentDidMount() {
        console.log('mount team_id', this.props.user.currentUser.team_id)
        this.props.dispatch({ type: 'GET_TEAM_WORKFLOWS', payload:this.props.user.currentUser.team_id })
    }

    state={}
    render() {
        return (
            <div >
             <h2>New Project</h2>
             <h4>Select your Workflow:</h4>
            <select>
                <option></option>
            {this.props.reduxState.workflow.teamWorkflows &&
            this.props.reduxState.workflow.teamWorkflows.map(workflow=>
                workflow.published===true &&
                <option key={workflow.id} value={workflow.name}>{workflow.name}</option>
                
            
            )}

            </select>
            <button>Create Workflow</button>
            </div>
        );
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
    user: reduxState.user
});
export default connect(mapStateToProps)(NewProject);
