import React from 'react';
import SideMenu from '../Components/SideMenu';

function Drivers() {
    return (
        <React.Fragment>
            <div>
                <img src={'/logo.png'} alt={`Logistics UK Logo`} />
            </div>
            <div>
                Hi, you reached the Drivers page!
            </div>
            <div className='sideMenu'>
                <SideMenu />
            </div>
        </React.Fragment>
    );
}

export default Drivers;