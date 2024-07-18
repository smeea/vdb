import React from 'react';

const ResultLibraryTrifle = () => {
  return (
    <span className="trifle">
      <img
        className="w-[24px] drop-shadow-[0px_0px_0.8px_#9a9a9a] dark:brightness-[0.85] dark:drop-shadow-[0px_0px_0.8px_#e0e0e0]"
        src={`${import.meta.env.VITE_BASE_URL}/images/misc/trifle.svg`}
        title="Trifle"
      />
    </span>
  );
};

export default ResultLibraryTrifle;
