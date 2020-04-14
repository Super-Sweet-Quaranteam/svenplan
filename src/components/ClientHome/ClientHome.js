import React from 'react';
import {connect} from 'react-redux';
import ClientNav from './ClientNav';
import ClientProfile from './ClientProfile';
import CreateWorkflow from '../AdminHome/CreateWorkflow/CreateWorkflow';
import ExistingProjects from '../AdminHome/ExistingProjects/ExistingProjects';
import ClientRisk from './ClientRisk';


const ClientHome =(props)=>{


    return (
        <>
            <ClientNav />
            
            {props.reduxState.clientDisplay.displayProfile === true 
                ?
                <ClientProfile 
                /> 
                :
                null
            }
            {props.reduxState.clientDisplay.displayNewWorkFlow === true 
                ?
                <CreateWorkflow 
                /> 
                :
                <img className="hero-image" src="/images/skyline.png" alt="skyline"/>
            }
            {props.reduxState.clientDisplay.displayOldWorkFlow === true 
                ?
                <ExistingProjects
                /> 
                :
                null
            }
            {props.reduxState.clientDisplay.displayRisk === true 
                ?
                <ClientRisk
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
