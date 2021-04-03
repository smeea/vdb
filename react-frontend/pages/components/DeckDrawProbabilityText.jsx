import React from 'react';
import drawProbability from './drawProbability.js';

const DeckDrawProbabilityText = ({N, n, k}) => {
  return(
    <div className="prob">
      <div className="d-flex justify-content-between">
        <div className="pr-2">1+</div>
        <div>{`${Math.floor(drawProbability(1, N, n, k) * 100)}%`}</div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="pr-2">2+</div>
        <div>
          {k < 2 ? null : `${Math.floor(drawProbability(2, N, n, k) * 100)}%`}
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="pr-2">3+</div>
        <div>
          {k < 3 ? null : `${Math.floor(drawProbability(3, N, n, k) * 100)}%`}
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="pr-2">4+</div>
        <div>
          {k < 4 ? null : `${Math.floor(drawProbability(4, N, n, k) * 100)}%`}
        </div>
      </div>
    </div>
  );
}

export default DeckDrawProbabilityText;
