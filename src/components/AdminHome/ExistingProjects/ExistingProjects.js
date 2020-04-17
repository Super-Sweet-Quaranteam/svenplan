import React, {Component} from 'react';
import {connect} from 'react-redux';

class ExistingProjects extends Component {
    // subscriber-side code. When 'Existing Projects' is clicked, page loads table of project, status and option for subscriber to continue or archive project
    archiveProject=()=>{
        console.log('archive btn clicked');   
    }
    componentDidMount(){
        this.props.dispatch({type: 'FETCH_EXISTING_PROJECTS'})
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
                        <td>Status percent(?) will go here</td>
                        {/* <td><button onClick={()=>this.continueWorkflow(project)}>Continue</button><button onClick={this.archiveProject}>Archive</button></td> */}           
                        <td>
                            {/* on btn click, user is routed to CurrentWorkflow component */}
                            <button className="nav-item" onClick={()=>this.props.dispatch({type: 'CLIENT_DISPLAY', payload: {displayCurrentWorkflow: true}})}>
                                <a className="nav-link" href="#/clientHome">Continue</a>
                            </button>
                            <button onClick={this.archiveProject}>Archive</button>
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
export default connect(mapStateToProps)(ExistingProjects);
