import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import AppContext from '../../context/AppContext.js';
import SelectLabelCrypt from './SelectLabelCrypt.jsx';
import SelectLabelLibrary from './SelectLabelLibrary.jsx';

function QuickSelect(props) {
  const { cryptCardBase, libraryCardBase, isMobile } = useContext(AppContext);

  const params = useParams();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (option) => {
    setSelectedValue(option.value);
  };
  const ref = useRef(null);

  const getOptionLabel = (option) => {
    const cardid = option.value;
    return (
      <>
        {cardid > 200000 ? (
          <SelectLabelCrypt
            cardid={option.value}
            inInventory={props.inInventory}
          />
        ) : (
          <SelectLabelLibrary
            cardid={option.value}
            inInventory={props.inInventory}
          />
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
    if (selectedValue > 200000) {
      props.setCard(cryptCardBase[selectedValue]);
      navigate(`/cards/${selectedValue}`);
    } else if (selectedValue > 100000) {
      props.setCard(libraryCardBase[selectedValue]);
      navigate(`/cards/${selectedValue}`);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (isMobile && !params['id']) ref.current.focus();
  }, []);

  const CardSelect = React.forwardRef((props, ref) => {
    return (
      <AsyncSelect
        classNamePrefix="react-select"
        cacheOptions
        autoFocus={!isMobile}
        value={selectedValue}
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
