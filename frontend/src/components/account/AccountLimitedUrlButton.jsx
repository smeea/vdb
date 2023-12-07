import React, { useState } from 'react';
import Link45Deg from '@/assets/images/icons/link-45deg.svg?react';
import { ButtonIconed } from '@/components';
import { useApp } from '@/context';

const AccountLimitedUrlButton = ({ format }) => {
  const { isDesktop } = useApp();
  const [success, setSuccess] = useState(false);

  const copyUrl = () => {
    const formatURI = encodeURI(`format=${format}`);
    const url = `${import.meta.env.VITE_BASE_URL}/account?${formatURI}`;

    navigator.clipboard.writeText(url);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1000);
  };
  return (
    <ButtonIconed
      onClick={copyUrl}
      title="Copy URL"
      icon={<Link45Deg width="21" height="21" viewBox="0 0 15 15" />}
      variant={success ? 'success' : isDesktop ? 'primary' : 'secondary'}
      text={success ? 'Copied' : 'Copy URL'}
    />
  );
};

export default AccountLimitedUrlButton;
