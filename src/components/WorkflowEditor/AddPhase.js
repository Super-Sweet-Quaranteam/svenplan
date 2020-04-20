import React, { Component } from 'react';
import {connect} from 'react-redux';
import AddTask from './AddTask';


/////////////currently unused component!


class AddPhase extends Component {

    state={
        phaseEdit: true,
        displayCard: false,
        time: new Date(),
        phaseName: {
            name: '',
            id: null
        }
    }

    // catalogs changes to be displayed
    handleChange=(e)=>{
        this.setState({phaseName: {
            name: e.target.value,
            id: (Number(e.target.form.attributes[0].textContent)+1)
        }})
    }

    // sends relevant info upon submit
    handleSubmit=(e)=>{
        e.preventDefault();
        this.setState({phaseEdit:false})
        let name = this.state.phaseName.name
        let id = this.state.phaseName.id
        this.props.dispatch({type: 'ADD_PHASE', payload: {name: name, id: id}});
    }


    render() {
        return (
            <div className="addPhase">
                {this.state.phaseEdit
                ?
                <form data-id={this.props.data} onSubmit={(e)=>this.handleSubmit(e)}>
                    <input type="text" value={this.state.phaseName.name} placeholder="enter title for phase" onChange={(e)=>this.handleChange(e)} />
                    <input type="submit" value="save" className="button"/>
                </form>
                :
                <>
                <h1>{this.state.phaseName.name}</h1>
                <button className="button" 
                    onClick={()=>this.setState({phaseEdit: true})}>
                    edit</button>
                </>
                }
                <br/>
                <button className="button" 
                onClick={()=>this.setState({displayCard: !this.state.displayCard})}>
                    add tasks to this phase</button>

                <div >
                    {this.state.displayCard
                    ? 
                    <AddTask data={this.state.phaseName.id}/> 
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