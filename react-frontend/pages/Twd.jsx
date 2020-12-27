import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AlertMessage from './components/AlertMessage.jsx';
import TwdResult from './components/TwdResult.jsx';
import TwdSearchForm from './components/TwdSearchForm.jsx';

function Twd(props) {
  return (
    <Container className="main-container">
      <Row className="justify-content-center">
        <Col
          md={12}
          xl={9}
          className={
            !(props.isMobile && props.showSearch)
              ? 'px-0 px-lg-4'
              : 'col-hide px-0 lx-lg-4'
          }
        >
          {props.results != undefined && props.results != null && (
            <TwdResult
              cardBase={props.cardBase}
              decks={props.results}
              getDecks={props.getDecks}
              /* showTotal={true} */
              /* sortMethod={sortMethod} */
              /* setSortMethod={setSortMethod} */
              isMobile={props.isMobile}
              showImage={props.showImage}
              setShowImage={props.setShowImage}
            />
          )}
          {props.results === null && (
            <AlertMessage className="error-message">
              <b>NO DECKS FOUND</b>
            </AlertMessage>
          )}
        </Col>
        <Col
          md={12}
          xl={3}
          className={
            !props.isMobile || (props.isMobile && props.showSearch)
              ? 'px-0'
              : 'col-hide px-0'
          }
        >
          {props.isMobile && props.results === null && (
            <AlertMessage className="error-message">
              <b>NO DECKS FOUND</b>
            </AlertMessage>
          )}
          <TwdSearchForm
            setShowSearch={props.setShowSearch}
            setResults={props.setResults}
            setCardBase={props.setCardBase}
            formState={props.formState}
            setFormState={props.setFormState}
            isMobile={props.isMobile}
            showImage={props.showImage}
            setShowImage={props.setShowImage}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Twd;
