import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center logo-box p-2 mb-3 my-md-3">
      <div onClick={() => navigate('/')} className="flex items-center">
        <img
          className="logo-image"
          src={`${process.env.ROOT_URL}images/misc/logo.svg`}
          title="logo"
          width="48"
          height="48"
        />
        <div className="d-inline text-3xl text-blue font-bold ps-2">VDB</div>
      </div>
      <div className="d-inline px-2">
        <div className="flex justify-end text-xs pb-1">
          <i>If only I had a laptop...</i>
        </div>
        <div className="flex justify-end text-xs">
          <i>- Enkidu, The Noah</i>
        </div>
      </div>
    </div>
  );
};

export default Banner;
