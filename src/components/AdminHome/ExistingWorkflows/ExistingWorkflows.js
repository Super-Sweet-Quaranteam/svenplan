import React, { Component } from 'react';
import {connect} from 'react-redux';
import EditWorkflow from './EditWorkflow';

class ExistingWorkflows extends Component {

    state = {
        edit: false,
        wf: {
            id: null,
            name: null,
            description: null
        }
    }

    componentDidMount=()=>{
        this.props.dispatch({type: 'GET_ALL_WORKFLOWS'})
    }

    editWorkflow=(id, name, description)=> {
        this.setState({edit: true, wf:{id: id, name: name, description: description}});
        this.props.dispatch({type: 'GET_THIS_WORKFLOW', payload: {id: id}})
    }

    render() {
        return (
            <>
                {this.state.edit
                ?
                <EditWorkflow wf={this.state.wf}/>   
                :
                <>
                <h2>Existing Workflows:</h2>
                <ul>
                    {this.props.reduxState.workflow.allWorkflows &&
                        this.props.reduxState.workflow.allWorkflows.map(flow => (
                            <li data-id={flow.id} key={flow.id}>
                                {flow.name}
                                <button className="btn-sml" onClick={()=>this.editWorkflow(flow.id, flow.name, flow.description)}>View</button>
                            </li>
                        ))
                    }    
                </ul>
                </>
                }
            </>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(ExistingWorkflows);