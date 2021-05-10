import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import ImageAlt from '../../assets/images/icons/image-alt.svg';
import FileTextFill from '../../assets/images/icons/chat-quote-fill.svg';
import AppContext from '../../context/AppContext.js';

function ButtonToggleShowImage(props) {
  const { showImage, setShowImage, isMobile } = useContext(AppContext);
  const [state, setState] = useState(false);

  const handleButton = () => {
    setShowImage(!showImage);
    setState(true);
    setTimeout(() => {
      setState(false);
      isMobile && props.setShowButtons(false);
    }, 1000);
  };

  return (
    <>
      {!state ? (
        <Button variant="outline-secondary" onClick={handleButton}>
          {showImage ? <ImageAlt /> : <FileTextFill />}
        </Button>
      ) : (
        <Button variant="success" onClick={handleButton}>
          {showImage ? 'Image' : 'Text'} on Hover
        </Button>
      )}
    </>
  );
}

export default ButtonToggleShowImage;
