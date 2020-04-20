import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class ExistingProjects extends Component {
    // subscriber-side code. When 'Existing Projects' is clicked, page loads table of project, status and option for subscriber to continue or archive project
    archiveProject=(id)=>{
        console.log('archive btn clicked with id', id);   
    }
    componentDidMount(){
        this.props.dispatch({type: 'FETCH_EXISTING_PROJECTS'})
    }
    continueProject(id){
        console.log('in continueProject with id:', id);
        //upon click, fetch details for that project and reroute to projects/id
        this.props.dispatch({ type: 'FETCH_SELECTED_PROJECT' })
        this.props.history.push(`/projects/${id}`);
    }

    render(){
    return (
        <div >
            <p>Existing Projects </p>

            <h2>Your Current Projects:</h2>
            {/* table below displays all projects belonging to one user */}
            <table>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {this.props.reduxState.subscriber.existingProjects.map(project =>
                    <tr key={project.id}>
                        <td>{project.name}</td>
                        <td>(filler) 70% complete</td>
                        {/* <td><button onClick={()=>this.continueWorkflow(project)}>Continue</button><button onClick={this.archiveProject}>Archive</button></td> */}           
                        <td>
                            {/* on btn click, user is routed to CurrentWorkflow component */}
                            {/* <button className="nav-item" onClick={()=>this.props.dispatch({type: 'CLIENT_DISPLAY', payload: {displayCurrentWorkflow: true}})}>
                                <a className="nav-link" href="#/clientHome">Continue</a>
                            </button> */}
                            <button className="nav-item" onClick={() => this.continueProject(project.id)}>Continue</button>
                            <button className="nav-item" onClick={()=>this.archiveProject(project.id)}>Archive</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <ul>
            </ul>
               
        </div>
    );
}
}
const mapStateToProps = reduxState => ({
reduxState
});
export default connect(mapStateToProps)(withRouter(ExistingProjects));
