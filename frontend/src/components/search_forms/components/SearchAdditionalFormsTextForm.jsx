import { useEffect, useState } from 'react';
import { Input } from '@/components';
import { TYPE_DEBOUNCE_DELAY } from '@/constants';
import { useDebounce } from '@/hooks';

const SearchAdditionalFormsTextForm = ({ id, value, onChange }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(value.value ?? '');
  }, [value]);

  useDebounce(() => onChange(id, text), TYPE_DEBOUNCE_DELAY, [text]);

  return (
    <Input
      placeholder="Card Name / Text / RegEx"
      value={text}
      onChange={(e) => setText(e.target.value)}
      autoFocus
    />
  );
};

export default SearchAdditionalFormsTextForm;
