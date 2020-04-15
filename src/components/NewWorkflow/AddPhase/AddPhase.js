import React, { Component } from 'react';
import {connect} from 'react-redux';
import AddTask from './AddTask';

class AddPhase extends Component {

    state={
        displayCard: false,
        phaseName: ''
    }

    // catalogs changes to be displayed
    handleChange=(e)=>{
        this.setState({phaseName: {
            name: e.target.value,
            id: e.target.parentElement.parentElement.attributes[0].nodeValue
        }})
    }

    // sends relevant info upon submit
    handleSubmit=(e)=>{
        let name = e.target.previousElementSibling.innerHTML;
        let id = (Number(e.target.parentElement.parentElement.attributes[0].nodeValue) + 1);
        this.props.dispatch({type: 'ADD_PHASE', payload: {name: name, id: id}});
    }


render() {
    return (
            <div className="addPhase">
                <h1>{this.state.phaseName.name}</h1>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <input type="text" placeholder="enter name for phase" onChange={(e)=>this.handleChange(e)} />
                    <input type="submit" value="save" className="button"/>
                </form>
                <br/>
                <button className="button" 
                onClick={()=>this.setState({displayCard: !this.state.displayCard})}>
                    add tasks to this phase</button>

                <div>
                    {this.state.displayCard
                    ? 
                    <AddTask /> 
                    :
                    null}
                </div>
            <h6>questions? click here for help</h6>
            </div>
        );
    }
}

const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(AddPhase);