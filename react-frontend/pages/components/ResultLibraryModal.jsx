import React from 'react';
import { Modal, Tabs, Tab, Row, Col, Button } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import ImageAlt from '../../assets/images/icons/image-alt.svg';
import FileTextFill from '../../assets/images/icons/chat-quote-fill.svg';
import ResultLibraryLayoutText from './ResultLibraryLayoutText.jsx';
import CardCopyUrlButton from './CardCopyUrlButton.jsx';

function ResultLibraryModal(props) {
  const CardImage = () => {
    const imgSrc = `${process.env.ROOT_URL}images/cards/${props.card['ASCII Name']
    .toLowerCase()
    .replace(/[\s,:!?'".\-\(\)\/]/g, '')}.jpg`;

    return(
      <img
        className='card-popover full-width'
        src={imgSrc}
        alt={props.card['Name']}
        onClick={props.handleClose}
      />
    );
  };

  return (
    <Modal
      size="lg"
      show={props.show}
      onHide={props.handleClose}
      animation={false}
      centered={props.isMobile ? false : true }
    >
      <Modal.Body className="p-0">
        {props.isMobile ?
         <>
           <button type="button" className="close m-1" onClick={props.handleClose}>
             <X width="32" height="32" viewBox="0 0 16 16" />
           </button>
           <Tabs
             transition={false}
             activeKey={props.showImage ? 'image' : 'text'}
             defaultActiveKey={props.showImage ? 'image' : 'text'}
             onSelect={(k) => props.setShowImage(k == 'image' ? true : false)}
           >
             <Tab eventKey="image" title="Image">
               <CardImage />
             </Tab>
             <Tab eventKey="text" title="Text">
               <div className="p-3">
                 <ResultLibraryLayoutText
                   card={props.card}
                   handleClose={props.handleClose}
                 />
               </div>
               <div className="px-3 pb-3">
                 <CardCopyUrlButton id={props.card['Id']} />
               </div>
             </Tab>
           </Tabs>
         </>
         :
         <Row>
           <Col className="bg-black px-0">
             <CardImage />
           </Col>
           <Col className="py-4 px-4 mr-3">
             <div className="pb-4">
               <ResultLibraryLayoutText
                 card={props.card}
                 handleClose={props.handleClose}
               />
             </div>
             <CardCopyUrlButton id={props.card['Id']} />
             <Button
               className="btn-block"
               variant="outline-secondary"
               onClick={() => props.setShowImage(!props.showImage)}
             >
               <div className="d-flex align-items-center justify-content-center">
                 {props.showImage
                  ? <>
                      Show on hover:
                      <div className="ml-1 pl-2 pr-1"><ImageAlt /></div>
                      Image
                    </>
                  : <>
                      Show on hover:
                      <div className="ml-1 pl-4 pr-1"><FileTextFill /></div>
                      Text
                    </>
                 }
               </div>
             </Button>
           </Col >
         </Row>
        }
      </Modal.Body>
    </Modal>
  );
}

export default ResultLibraryModal;
