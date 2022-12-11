import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="logo-box flex items-center w-full justify-between p-2">
      <div onClick={() => navigate('/')} className="flex items-center">
        <img
          className="logo-image"
          src={`${process.env.ROOT_URL}images/misc/logo.svg`}
          title="logo"
          width="48"
          height="48"
        />
        <div className="text-blue pl-2 inline text-3xl font-bold">VDB</div>
      </div>
      <div className="inline px-2">
        <div className="flex justify-end pb-1 text-xs">
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
