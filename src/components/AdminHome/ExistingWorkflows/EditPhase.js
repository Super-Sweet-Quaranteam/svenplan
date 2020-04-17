import React, { Component } from 'react';
import {connect} from 'react-redux';
import EditTask from './EditTask';

class EditPhase extends Component {

    state={
        edit: this.props.edit,
    }


    componentDidMount=()=>{

    }

    handleSubmit=()=>{
        this.setState({edit: false})
    }

    render() {
        return (
            <>
            {this.props.edit === false
            ?
            <div className="addPhase">
                <h3>{this.props.name}</h3>
                <p>{this.props.description}</p>
            </div>
            :
            <>
                <form data-id={this.props.data} onSubmit={(e)=>this.handleSubmit(e)}>
                    <input type="text" value={this.props.name} placeholder="enter title for phase" onChange={(e)=>this.handleChange(e)} />
                    <input type="submit" value="save" className="button"/>
                </form>
                <button className="btn-sml">Edit Tasks</button>
            </>
            }
            </>
        );
    }
}

const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(EditPhase);