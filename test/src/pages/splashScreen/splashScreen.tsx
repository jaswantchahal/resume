import React from 'react';

const Splash: React.FC = () => {

  return (
    <div className='loading-screen'>
        <div className="logo">
            <img src="/images/logo.svg" alt="" />
        </div>
        <div className="splash-msg">
          <img src="./images/splash-secure.png" alt="" />
        </div>
    </div>
  );
};

export default Splash;
