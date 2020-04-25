import React, {Component} from 'react';
import {connect} from 'react-redux';


class Alerts extends Component {

   componentDidMount=()=>{
       this.props.dispatch({type: 'GET_ALERT_LIST'});
   }

   markResolved=(id)=>{
       this.props.dispatch({type: 'MARK_RESOLVED', payload: id});
   }

    render() {
        return (
            <div >
                <h2>Team Member Alerts</h2>
                <table className="tbl-lg">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Team</th>
                            <th>Alert Message</th>
                            <th>Created</th>
                            <th>Resolved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reduxState.alerts.alertList.id === null 
                        ?
                        <p>No Alerts Curently</p>
                        :
                        <>
                            {this.props.reduxState.alerts.alertList.map(alert => 
                            <>
                                {this.props.reduxState.user.currentUser.team_id === alert.team_id 
                                &&
                                    <tr key={alert.id}>
                                        <td>{alert.firstname} {alert.lastname}</td>
                                        <td>{alert.teamname}</td>
                                        <td>{alert.description}</td>
                                        <td>{alert.created}</td>
                                        {(alert.resolved === false)
                                        ?
                                            <td><button onClick={()=>this.markResolved(alert.id)} 
                                                className='btn-sml'>Mark Resolved</button></td>
                                        :
                                            <td>Resolved</td>
                                        }
                                    </tr>
                                }
                            </> 
                            )}
                        </>
                        }                 
                    </tbody>
                </table>
            </div>
        );
    }
}


const putReduxStateOnProps=(reduxState)=>({
    reduxState
});
  
export default connect(putReduxStateOnProps)(Alerts);

