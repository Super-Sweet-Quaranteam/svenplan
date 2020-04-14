import React from 'react';
import AddTask from './AddTask';


function Container(props) {

   
    return (
        <>
            <h1>Dashboard</h1>
            <div>
                <span>stuff <span> things<span> More Stuf n things</span></span></span>
            </div>
            <div className="wrapper">
                <div className="container">
                    <AddTask/>
                </div>
                <div className="container">
                    <AddTask/>
                </div>
            </div>
        </>
    );
}

export default Container;
