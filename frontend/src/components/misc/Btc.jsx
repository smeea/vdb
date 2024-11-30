import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ClipboardFill from '@icons/clipboard-fill.svg?react';

const Btc = () => {
  const [success, setSuccess] = useState(false);
  const BTC_WALLET = 'bc1qcj6zs57xskca9cua2lj5la6l2yz368j0wxdeap';

  const handleClick = () => {
    navigator.clipboard.writeText(BTC_WALLET);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 500);
  };

  return (
    <div className="flex whitespace-nowrap">
      <a href={`https://www.blockchain.com/btc/address/${BTC_WALLET}`}>
        <div className="inline font-mono text-sm">{BTC_WALLET}</div>
      </a>
      <div
        className={twMerge(
          'inline pl-1',
          success
            ? 'text-fgSecondaryDark hover:text-fgSecondaryDark dark:text-whiteDark dark:hover:text-fgSecondaryDark'
            : 'text-fgSecondary hover:text-blue dark:text-fgSecondaryDark dark:hover:text-fgPrimaryDark',
        )}
        onClick={handleClick}
      >
        <ClipboardFill className="inline" viewBox="0 0 18 18" />
      </div>
    </div>
  );
};

export default Btc;
