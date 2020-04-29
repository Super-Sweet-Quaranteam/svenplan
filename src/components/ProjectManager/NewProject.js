import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewProject extends Component {
    // subscriber-side code. When 'Existing Projects' is clicked, page loads table of project, 
    // status and option for subscriber to continue or archive project

    state = { 
        team: this.props.user.currentUser.team_id
    }

    componentDidMount() {
        console.log('mount team_id', this.props.user.currentUser.team_id)
        this.props.dispatch({ type: 'GET_TEAM_WORKFLOWS', payload:this.props.user.currentUser.team_id })
    }

    handleChange = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    createProject =()=>{
        this.props.dispatch({ type: 'CREATE_PROJECT', 
        payload:{name:this.state.name,
                    team:this.state.team,
                    workflow: Number(this.state.workflow)  
                }});
        this.props.history.push('/projects');           
    }

    render() {
        return (
            <>
                <h2>New Project</h2>
                <br/>
                <br/>
                <form className="form">
                    <label>Select Workflow</label>
                    <select onChange={this.handleChange('workflow')}>
                        <option></option>
                    {this.props.reduxState.workflow.teamWorkflows &&
                    this.props.reduxState.workflow.teamWorkflows.map(workflow=>
                        workflow.published===true &&
                        <option key={workflow.id} value={Number(workflow.id)}>{workflow.name}</option>
                     )}
                    </select>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <li>
                        <label>Project Name</label>
                        <input type="text" onChange={this.handleChange('name')} placeholder='Project Name'/>
                        <span>Title Project</span>
                    </li>
                    <button className="btn-sml" onClick={this.createProject}>Create Project</button>
                </form>
            </>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
    user: reduxState.user
});

export default connect(mapStateToProps)(NewProject);
