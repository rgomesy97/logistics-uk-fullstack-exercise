import React from 'react';
import SideMenu from '../Components/SideMenu';

function Vehicles() {
    return (
        <React.Fragment>
            <div>
                <img src={'/logo.png'} alt={`Logistics UK Logo`} />
            </div>
            <div>
                Hi, you reached the Vehicles page!
            </div>
            <div className='sideMenu'>
            <SideMenu />
            </div>
        </React.Fragment>
    );
}

export default Vehicles;