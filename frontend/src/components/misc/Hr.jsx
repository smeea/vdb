import React from 'react';

const Hr = ({ className, variant = 'primary' }) => {
  const getStyle = (variant) => {
    switch (variant) {
      case 'primary':
        return 'text-borderPrimary dark:text-borderPrimaryDark';
      case 'secondary':
        return 'text-darkGray dark:text-darkGrayDark';
      case 'thick':
        return 'border-2 text-darkGray dark:text-darkGrayDark';
    }
  };

  const customStyle = getStyle(variant);

  return <hr className={`${customStyle} ${className}`} />;
};

export default Hr;
