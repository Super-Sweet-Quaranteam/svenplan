import React, {Component} from 'react';
import {connect} from 'react-redux';
import './NewWorkflow.css'

class NewWorkflow extends Component {
    state = {
        phases: [],
        workflow: {
            number: 0,
            name: '',
            description: '',
        }
    }
    //ideally phases array would be in workflow obj
    addPhase=()=> {
        this.setState({
            phases: [...this.state.phases, "phase"]
        })
    }
    createWorkflow=()=>{        
        this.setState({
            //need code in here?
        })
    }
    handleChange=(event, typeOf)=>{                
        this.setState({
            [typeOf]: event.target.value
        })
    }
        render() {
        return (
            <div>
                <h3>New Workflow Home Below</h3>
                    {this.state.workflow.name}
                    {this.state.workflow.description}
                        <label> Workflow Name:
                            <br/>
                            <input onChange={(event)=>this.handleChange(event, "name")}></input>
                        </label> 
                        <br/>
                        <label> Description:
                            <br/>
                            <textarea onChange={(event)=>this.handleChange(event, "description")}></textarea>
                        </label>  
                        <br/>                   
                        <button onClick={this.createWorkflow}>Create</button>

                    {/* on btn click, a new phase is added to array, currently a taco string but maybe an array of tasks once add task component is set up */}
                    <button onClick={this.addPhase}>Add Phase</button>
                    <div className="phaseWrapper">
                        {this.state.phases.map(phase => <div className="phaseBlock">Add tasks button here</div>)}
                    </div>
            </div>
        );
    }
}
const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(NewWorkflow);