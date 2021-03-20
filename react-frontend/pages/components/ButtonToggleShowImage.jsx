import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ImageAlt from '../../assets/images/icons/image-alt.svg';
import FileTextFill from '../../assets/images/icons/chat-quote-fill.svg';

function ButtonToggleShowImage(props) {
  const [state, setState] = useState(false);

  const handleButton = () => {
    props.setShowImage(!props.showImage);
    setState(true);
    setTimeout(() => {
      setState(false);
      props.isMobile && props.setShowButtons(false);
    }, 1000);
  };

  return (
    <>
      {!state ? (
        <Button variant="outline-secondary" onClick={handleButton}>
          {props.showImage ? <ImageAlt /> : <FileTextFill />}
        </Button>
      ) : (
        <Button variant="success" onClick={handleButton}>
          {props.showImage ? 'Image' : 'Text'} on Hover
        </Button>
      )}
    </>
  );
}

export default ButtonToggleShowImage;
