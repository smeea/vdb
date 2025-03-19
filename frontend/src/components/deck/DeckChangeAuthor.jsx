import { useEffect, useState } from 'react';
import PersonFill from '@icons/person-fill.svg?react';
import { Input, InputLabel } from '@/components';
import { AUTHOR, DECKID } from '@/constants';
import { deckUpdate } from '@/context';
import { getIsEditable } from '@/utils';

const DeckChangeAuthor = ({ deck }) => {
  const [value, setValue] = useState(deck[AUTHOR] || '');
  const isEditable = getIsEditable(deck);

  useEffect(() => {
    if (value !== deck[AUTHOR]) setValue(deck[AUTHOR] ?? '');
  }, [deck[AUTHOR]]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const deckChangeAuthor = () => {
    deckUpdate(deck[DECKID], AUTHOR, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    deckChangeAuthor();
  };

  const handleOnBlur = () => {
    if (value !== deck[AUTHOR]) {
      deckChangeAuthor();
    }
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <InputLabel title="Author">
        <PersonFill width="20" height="20" viewBox="0 0 16 16" />
      </InputLabel>
      <Input
        value={value}
        onChange={handleChange}
        onBlur={handleOnBlur}
        readOnly={!isEditable}
        roundedStyle="rounded-r"
        borderStyle="border-r border-y"
      />
    </form>
  );
};

export default DeckChangeAuthor;
