import React, {Component} from 'react';
import logo from '../../Logo/svenplan-logo2.png'
import {connect} from 'react-redux';

class ExistingProjects extends Component {

//     state = {projects:[
//         {
//         clientid: 0,
//         projectId:0,
//         projectName: "Dayton's Flagship",
       
//     },
//     {
//         clientid: 0,
//         projectId:1,
//        projectName: 'West Philly Expansion'
//     },
//        {clientid: 0,
//         projectId: 2,
//         projectName: 'New HQ'
//         },
//         {
//             clientid: 0,
//             projectId: 3,
//             projectName: 'Target Potato Farm'
//         }
//     ]
// }
    archiveProject=()=>{
        console.log('archive btn clicked');
        
    }
    continueWorkflow=()=>{
        console.log('continue btn clicked');
    }
    componentDidMount(){
        console.log('heyo');
        this.props.dispatch({type: 'FETCH_EXISTING_PROJECTS'})
    }
    projectDetails=()=>{
        console.log('take to project details')
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
                        <td><button onClick={this.continueWorkflow}>Continue</button><button onClick={this.archiveProject}>Archive</button></td>
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
