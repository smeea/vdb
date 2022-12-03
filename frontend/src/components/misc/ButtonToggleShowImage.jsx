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

  const handleButton = () => {
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
          onClick={handleButton}
        >
          {showImage ? <ImageAlt /> : <FileTextFill />}
        </Button>
      ) : (
        <Button variant="success" onClick={handleButton}>
          {showImage ? 'Image' : 'Text'} on Hover
        </Button>
      )}
    </>
  );
};

export default ButtonToggleShowImage;
