import React from 'react';
import ThreeDots from '@icons/three-dots.svg?react';

const Spinner = ({ className = '' }) => {
  return (
    <div className="animate-spin">
      <ThreeDots className={className} />
    </div>
  );
};

export default Spinner;
