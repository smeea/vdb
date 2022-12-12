import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="logo-box flex w-full items-center justify-between p-2">
      <div onClick={() => navigate('/')} className="flex items-center">
        <img
          className="logo-image"
          src={`${process.env.ROOT_URL}images/misc/logo.svg`}
          title="logo"
          width="48"
          height="48"
        />
        <div className="text-blue inline text-3xl font-bold pl-2">VDB</div>
      </div>
      <div className="inline text-xs italic space-y-1 px-2">
        <div className="flex justify-end">If only I had a laptop...</div>
        <div className="flex justify-end">- Enkidu, The Noah</div>
      </div>
    </div>
  );
};

export default Banner;
