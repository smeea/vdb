import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { useApp } from 'context';
import { SelectLabelCrypt, SelectLabelLibrary } from 'components';

function QuickSelect(props) {
  const { isMobile } = useApp();

  const params = useParams();
  const handleChange = (option) => {
    props.setCardId(option.value);
  };
  const ref = useRef(null);

  const getOptionLabel = (option) => {
    const cardId = option.value;
    return (
      <>
        {cardId > 200000 ? (
          <SelectLabelCrypt cardid={cardId} inInventory={props.inInventory} />
        ) : (
          <SelectLabelLibrary cardid={cardId} inInventory={props.inInventory} />
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
        placeholder="Card Name"
        loadOptions={loadOptions}
        getOptionLabel={getOptionLabel}
        onChange={handleChange}
        ref={ref}
      />
    );
  });
  CardSelect.displayName = 'CardSelect';

  return <CardSelect ref={ref} />;
}

export default QuickSelect;
