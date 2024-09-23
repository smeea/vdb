import React from 'react';
import { PlaytestReportEntry } from '@/components';
import { useFetch } from '@/hooks';

const PlaytestReportEntryWrapper = ({ id, isPrecon }) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/export/${
    isPrecon ? 'precons' : 'cards'
  }/${id}`;
  const { value } = useFetch(url, {}, [id]);

  return <PlaytestReportEntry value={value} />;
};

export default PlaytestReportEntryWrapper;
