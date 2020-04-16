import React from 'react'; 
import { connect } from 'react-redux';
import './AdminHome.css'
import logo from '../Logo/svenplan-logo2.png'
import AdminNav from './AdminNav/AdminNav';
import CreateWorkflow from './CreateWorkflow/CreateWorkflow';
import ExistingWorkflows from './ExistingWorkflows/ExistingWorkflows'
import ExistingProjects from './ExistingProjects/ExistingProjects'
import ClientAlerts from './ClientAlerts/ClientAlerts';
import ClientList from './ClientList/ClientList'






function AdminHome(props) {





    return (
        <>       
          
          
               <AdminNav />

            {props.reduxState.admin.adminDisplay.displayOldWorkFlow === true
                ?
                <ExistingWorkflows
                />
                :
                null
            }
            {props.reduxState.admin.adminDisplay.displayNewWorkFlow === true
                ?
                <CreateWorkflow
                />
                :
                <img className="hero-image" src="/images/skyline.png" alt="skyline" />
            }
            {props.reduxState.admin.adminDisplay.displayOldProjects === true
                ?
                <ExistingProjects
                />
                :
                null
            }
            {props.reduxState.admin.adminDisplay.displayAlerts === true
                ?
                <ClientAlerts
                />
                :
                null
            }
            {props.reduxState.admin.adminDisplay.displayClients === true
                ?
                <ClientList
                />
                :
                null
            }
           
            
       

           
        </>
    );
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
});

export default connect(putReduxStateOnProps)(AdminHome);