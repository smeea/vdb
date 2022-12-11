import React from 'react';
import { Button } from 'components';

const TwdSearchFormCapacity = ({ value, onChange }) => {
  return (
    <>
      {['1-4', '4-6', '6-8', '8-11'].map((i, index) => {
        return (
          <Button
            className="group-form whitespace-nowrap"
            key={index}
            value={i}
            name="capacity"
            variant={value[i] ? 'third' : 'outline-primary'}
            onClick={onChange}
          >
            {i}
          </Button>
        );
      })}
    </>
  );
};

export default TwdSearchFormCapacity;
