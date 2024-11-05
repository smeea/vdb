import React from 'react';
import { PlaytestReportEntry } from '@/components';
import { useFetch } from '@/hooks';
import { PRECONS, CARDS } from '@/constants';

const PlaytestReportEntryWrapper = ({ id, isPrecon }) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/export/${isPrecon ? PRECONS : CARDS}/${id}`;
  const { value } = useFetch(url, {}, [id]);

  return <>{value && <PlaytestReportEntry value={value} />}</>;
};

export default PlaytestReportEntryWrapper;
