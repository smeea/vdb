import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { useApp } from 'context';
import { SelectLabelCrypt, SelectLabelLibrary } from 'components';

const QuickSelect = ({ selectedCard, setCardid, inInventory }) => {
  const { isMobile } = useApp();

  const params = useParams();
  const handleChange = (option) => {
    setCardid(option.value);
  };
  const ref = useRef(null);

  const getOptionLabel = (option) => {
    const cardid = option.value;

    return (
      <>
        {cardid ? (
          cardid > 200000 ? (
            <SelectLabelCrypt cardid={cardid} inInventory={inInventory} />
          ) : (
            <SelectLabelLibrary cardid={cardid} inInventory={inInventory} />
          )
        ) : (
          <div className="gray">Enter Card Name</div>
        )}
      </>
    );
  };

  const loadOptions = async (inputValue) => {
    const url = `${process.env.API_URL}search/quick`;
    const input = { name: inputValue };
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    };

    if (inputValue.length > 2) {
      const response = await fetch(url, options);
      const json = await response.json();
      return json.map((card) => ({
        value: card,
      }));
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (isMobile && !params.id) ref.current.focus();
  }, []);

  const CardSelect = React.forwardRef((props, ref) => {
    return (
      <AsyncSelect
        classNamePrefix="react-select"
        cacheOptions
        autoFocus={!isMobile}
        loadOptions={loadOptions}
        value={{ value: selectedCard }}
        getOptionLabel={getOptionLabel}
        onChange={handleChange}
        ref={ref}
      />
    );
  });
  CardSelect.displayName = 'CardSelect';

  return <CardSelect ref={ref} />;
};

export default QuickSelect;
