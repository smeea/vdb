import React from 'react';
import DoorClosedFill from '@icons/door-closed-fill.svg?react';
import { useApp } from '@/context';
import { userServices } from '@/services';
import { ButtonIconed } from '@/components';

const AccountLogoutButton = () => {
  const { initializeUnauthenticatedUser } = useApp();

  const logoutUser = () => {
    initializeUnauthenticatedUser();
    userServices.logout();
  };

  return (
    <ButtonIconed
      className="w-full"
      onClick={logoutUser}
      title="Logout"
      icon={<DoorClosedFill />}
      text="Logout"
    />
  );
};

export default AccountLogoutButton;
