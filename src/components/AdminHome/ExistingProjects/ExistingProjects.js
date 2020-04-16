import React, {Component} from 'react';
import logo from '../../Logo/svenplan-logo2.png'
import {connect} from 'react-redux';

class ExistingProjects extends Component {

    archiveProject=()=>{
        console.log('archive btn clicked');   
    }
    continueWorkflow=(project)=>{
        console.log('continue btn clicked');
        console.log('this.props.history is', this.props);
    }
    componentDidMount(){
        this.props.dispatch({type: 'FETCH_EXISTING_PROJECTS'})
    }

    render(){
    return (
        <div >
            <p>Existing Projects </p>

            <h2>Your Current Projects:</h2>
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
                        <td><button onClick={()=>this.continueWorkflow(project)}>Continue</button><button onClick={this.archiveProject}>Archive</button></td>
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
