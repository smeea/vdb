import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import ResultCryptLayoutText from './components/ResultCryptLayoutText.jsx';
import ResultLibraryLayoutText from './components/ResultLibraryLayoutText.jsx';
import CardCopyUrlButton from './components/CardCopyUrlButton.jsx';

function Cards(props) {
  const [card, setCard] = useState(undefined);

  const CardImage = () => {
    if (card) {
      const imgSrc = props.id > 200000 ?
            `${process.env.ROOT_URL}images/cards/${card['ASCII Name']
    .toLowerCase()
    .replace(/[\s,:!?'".\-\(\)\/]/g, '')}${card['Adv'] && 'adv'}.jpg`
            : `${process.env.ROOT_URL}images/cards/${card['ASCII Name']
    .toLowerCase()
    .replace(/[\s,:!?'".\-\(\)\/]/g, '')}.jpg`

      return(
        <img
          className='card-popover full-width'
          src={imgSrc}
          alt={card['Name']}
        />
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (props.id > 200000 && props.cryptCardBase) {
      setCard(props.cryptCardBase[props.id])
    } else if (props.id < 200000 && props.libraryCardBase) {
      setCard(props.libraryCardBase[props.id])
    }
  }, [props.cryptCardBase, props.libraryCardBase])

  return (
    <>
      {props.isMobile ?
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
             {card && props.id > 200000 && <ResultCryptLayoutText card={card}/>}
             {card && props.id < 200000 && <ResultLibraryLayoutText card={card}/>}
           </div>
           <div className="px-3 pb-3">
             <CardCopyUrlButton id={props.id} />
           </div>
         </Tab>
       </Tabs>
       :
       <Container className="deck-container">
         <Row className="h-75 align-content-center justify-content-center py-3">

           <Col lg={4}>
             <CardImage />
           </Col>
           <Col lg={4} className="pr-0">
             {card && props.id > 200000 && <ResultCryptLayoutText card={card}/>}
             {card && props.id < 200000 && <ResultLibraryLayoutText card={card}/>}
             <div className="pt-3">
               <CardCopyUrlButton id={props.id} />
             </div>
           </Col>
         </Row>
       </Container>
      }
    </>
  );
}

export default Cards;
