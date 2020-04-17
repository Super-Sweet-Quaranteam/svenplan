import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Client.css';

class CurrentWorkflow extends Component {
    componentDidMount(){
        console.log('we in it fam');        
    }
    render() {
        return (
            <div className='CurrentWorkflow'>
                <div className="phaseOverview">
                    {/* once we have workflows in reduxState, we'll need to connect the code below */}
                    <div className="phaseOverviewItem">(filler) Phase 1: Ideation</div>
                </div>
                <div className="taskWindow">
                    {/* will also need to populate from reduxState */}
                    <div className="taskAtHand">(filler)Task Window
                        <br/>
                        tasks, check boxes, tutorials, etc will go in this window
                        <br/>
                        <button>Back</button>
                        <button>Next</button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = reduxState => ({
reduxState
});
export default connect(mapStateToProps)(CurrentWorkflow);