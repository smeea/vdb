import React, { useState } from 'react';
import FileTextFill from '@icons/chat-quote-fill.svg?react';
import ImageAlt from '@icons/image-alt.svg?react';
import { ButtonIconed } from '@/components';
import { useApp } from '@/context';

const ButtonToggleShowImage = () => {
  const { showImage, toggleShowImage } = useApp();
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    toggleShowImage();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  return (
    <ButtonIconed
      title="Show card image or text preview on mouse hover"
      variant={success ? 'success' : 'primary'}
      onClick={handleClick}
      icon={showImage ? <ImageAlt /> : <FileTextFill />}
      text={success ? `${showImage ? 'Image' : 'Text'} on Hover` : null}
    />
  );
};

export default ButtonToggleShowImage;
