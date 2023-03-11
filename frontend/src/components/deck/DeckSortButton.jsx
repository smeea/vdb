import React from 'react';
import { SortButton } from '@/components';

const DeckSortButton = ({ onChange }) => {
  const sortMethods = { Name: 'byName', Date: 'byDate' };

  return <SortButton sortMethods={sortMethods} setSortMethod={onChange} />;
};

export default DeckSortButton;
