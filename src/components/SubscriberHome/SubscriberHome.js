import React from 'react';
import {connect} from 'react-redux';
import ClientNav from './ClientNav';
import CreateWorkflow from '../WorkflowEditor/CreateWorkflow';
import ExistingProjects from '../ProjectManager/ExistingProjects';
import ClientRisk from '../RiskChart/RiskChart';
import CurrentWorkflow from '../ProjectManager/CurrentWorkflow';
import UserProfile from '../UserProfile/UserProfile'

const ClientHome =(props)=>{


    return (
        <>
            <h2>This is client home. it still has client nav in it. Haley was afraid of messing things up.</h2>
            <ClientNav />
            
            {props.reduxState.client.clientDisplay.displayProfile === true 
                ?
                <UserProfile 
                /> 
                :
                null
            }
            {props.reduxState.client.clientDisplay.displayNewWorkFlow === true 
                ?
                <CreateWorkflow 
                /> 
                :
            null
            }
            {props.reduxState.client.clientDisplay.displayOldWorkFlow === true 
                ?
                <ExistingProjects
                /> 
                :
                null
            }
            {props.reduxState.client.clientDisplay.displayRisk === true 
                ?
                <ClientRisk
                /> 
                :
                null
            }
            {props.reduxState.client.clientDisplay.displayCurrentWorkflow === true 
                ?
                <CurrentWorkflow
                /> 
                :
                null
            }
        </>
    );
}

const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(ClientHome);
