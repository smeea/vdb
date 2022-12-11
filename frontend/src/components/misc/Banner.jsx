import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="logo-box flex w-full items-center justify-between">
      <div onClick={() => navigate('/')} className="flex items-center">
        <img
          className="logo-image"
          src={`${process.env.ROOT_URL}images/misc/logo.svg`}
          title="logo"
          width="48"
          height="48"
        />
        <div className="text-blue inline  text-3xl font-bold">VDB</div>
      </div>
      <div className="inline ">
        <div className="flex justify-end  text-xs">
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
