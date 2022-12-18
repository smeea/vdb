import React, { useState } from 'react';
import FileTextFill from 'assets/images/icons/chat-quote-fill.svg';
import ImageAlt from 'assets/images/icons/image-alt.svg';
import { ButtonIconed } from 'components';
import { useApp } from 'context';

const ButtonToggleShowImage = () => {
  const { showImage, toggleShowImage } = useApp();
  const [success, setSuccess] = useState(false);

  const onClick = () => {
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
      onClick={onClick}
      icon={showImage ? <ImageAlt /> : <FileTextFill />}
      text={`${showImage ? 'Image' : 'Text'} on Hover`}
    />
  );
};

export default ButtonToggleShowImage;
