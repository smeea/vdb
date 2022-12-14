import React, { useState } from 'react';
import { Button } from 'components';
import ImageAlt from 'assets/images/icons/image-alt.svg';
import FileTextFill from 'assets/images/icons/chat-quote-fill.svg';
import { useApp } from 'context';

const ButtonToggleShowImage = () => {
  const {
    showImage,
    toggleShowImage,
    setShowFloatingButtons,
    setShowMenuButtons,
  } = useApp();
  const [state, setState] = useState(false);

  const onClick = () => {
    toggleShowImage();
    setState(true);
    setTimeout(() => {
      setState(false);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }, 1000);
  };

  return (
    <>
      {!state ? (
        <Button
          title="Show card image or text preview on mouse hover"
          variant="primary"
          onClick={onClick}
        >
          {showImage ? <ImageAlt /> : <FileTextFill />}
        </Button>
      ) : (
        <Button variant="success" onClick={onClick}>
          {showImage ? 'Image' : 'Text'} on Hover
        </Button>
      )}
    </>
  );
};

export default ButtonToggleShowImage;
