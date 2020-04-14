import React, {Component} from 'react';
import logo from '../../Logo/svenplan-logo2.png'

class ExistingProjects extends Component {

    state = {projects:[
        {
        clientid: 0,
        projectId:0,
        projectName: "Dayton's Flagship",
       
    },
    {
        clientid: 0,
        projectId:1,
       projectName: 'West Philly Expansion'
    },
       {clientid: 0,
        projectId: 2,
        projectName: 'New HQ'
        },
        {
            clientid: 0,
            projectId: 3,
            projectName: 'Target Potato Farm'
        }
    ]
}

    projectDetails=()=>{
        console.log('take to project details')
    }
   render(){
    return (
        <div >
            <img src={logo} width="75px" alt="SvenPlan Logo" />
            <p>Existing Projects </p>

            <h2>Your Current Projects:</h2>
            <ul>
                {this.state.projects.map(project => (
                    <li onClick={this.projectDetails} key={project.projectId}>
                        {project.projectName}
                    </li>))}              
            </ul>
               
        </div>
    );
}
}

export default ExistingProjects;
