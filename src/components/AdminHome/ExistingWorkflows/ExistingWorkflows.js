import React, { Component } from 'react';
import {connect} from 'react-redux';

class ExistingWorkflows extends Component {

    state = {
        edit: false
    }

    componentDidMount=()=>{
        this.props.dispatch({type: 'GET_ALL_WORKFLOWS'})
    }

    editWorkflow=(id)=> {
        this.setState({edit: true});
        this.props.dispatch({type: 'GET_THIS_WORKFLOW', payload: {id: id}})
    }

    render() {
        return (
            <>
                <h2>Existing Workflows:</h2>
                <ul>
                    {this.props.reduxState.workflow.allWorkflows &&
                        this.props.reduxState.workflow.allWorkflows.map(flow => (
                            <li data-id={flow.id} key={flow.id}>
                                {flow.name}
                                <button onClick={()=>this.editWorkflow(flow.id)}>Edit</button>
                            </li>
                        ))
                    }    
                </ul>
            </>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(ExistingWorkflows);