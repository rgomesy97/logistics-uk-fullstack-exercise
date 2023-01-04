import React, { useEffect, useState } from 'react';
import '../App.css';
import SideMenu from '../Components/SideMenu';
import DriverMenu from '../Components/DriverMenu';

const App: React.FunctionComponent = (): React.ReactElement => {
  
  return (
    <React.Fragment>
      <div>
        <img src={'/logo.png'} alt={`Logistics UK Logo`} />
      </div>
      <div className='parent'>
        <div className='sideMenu'>
          <SideMenu />
        </div>
        <div className='mainBody'>
          <DriverMenu />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
