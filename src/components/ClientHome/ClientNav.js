import React from 'react';
import {connect} from 'react-redux';

function ClientNav(props) {


    return (
        <>
            <nav className="nav-wrapper">
                <ul className="nav">
                    <li className="nav-logo"><img src="/images/square-logo.png" alt="logo" height="80px"></img></li>
                    <li className="nav-item" onClick={()=>props.dispatch({type: 'CLIENT_DISPLAY', payload: {displayProfile: true}})}>
                        <a className="nav-link" href="#/clientHome">Profile</a></li>
                    <li className="nav-item" onClick={()=>props.dispatch({type: 'CLIENT_DISPLAY', payload: {displayNewWorkFlow: true}})}>
                        <a className="nav-link" href="#/clientHome">New Projects</a></li>
                    <li className="nav-item" onClick={()=>props.dispatch({type: 'CLIENT_DISPLAY', payload: {displayOldWorkFlow: true}})}>
                        <a className="nav-link" href="#/clientHome">Existing Projects</a></li>
                    <li className="nav-item" onClick={()=>props.dispatch({type: 'CLIENT_DISPLAY', payload: {displayRisk: true}})}>
                        <a className="nav-link" href="#/clientHome">Risk Data</a></li>
                    <li className="nav-item"><a className="nav-link" href="#add-task">Business Models</a></li>
                    <li className="nav-item"><a className="nav-link" href="#add-task">Support</a></li>
                </ul>
            </nav>
        </>
    );  
}

const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(ClientNav);