import React from 'react';



function ClientProfile() {


    return (
        <>
            <h3>Client Profile</h3>
            <form>
                <input type="text" placeholder="name"/>
                <input type="text" placeholder="ocupation"/>
                <input type="text" placeholder="number of pets"/>
                <input type="text" placeholder="mothers madien name"/>
                <input type="text" placeholder="favorite color"/>
                <input type="text" placeholder="phone number"/>
                <input type="submit" className="button"/>
            </form>
        </>
    );
}

export default ClientProfile;