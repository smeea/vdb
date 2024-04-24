import React from 'react';
import { PlaytestReportExport } from '@/components';
import { useFetch } from '@/hooks';

const PlaytestReportExportWrapper = ({ id, isPrecon }) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/export/${
    isPrecon ? 'precons' : 'cards'
  }/${id}`;
  const { value } = useFetch(url, {}, [id]);

  return <PlaytestReportExport value={value} />;
};

export default PlaytestReportExportWrapper;
