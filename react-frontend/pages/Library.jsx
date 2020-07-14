import React from 'react';
import LibraryForm from './components/LibraryForms.jsx';
import LibraryResults from './components/LibraryResults.jsx';

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  render() {
    const setResults = (cards) => {
      this.setState({cards: cards});
    };

    return (
      <div className="container main-container py-xl-3 px-0 px-xl-2">
        <div className="row mx-0">
          <div className="col-xs-12 col-xl-1 left-col px-0 px-xl-2">
            CARD PREVIEW ON HOVER
          </div>
          <div className="col-xs-12 col-xl-7 center-col px-0 px-xl-2">
            <LibraryResults cards={this.state.cards}/>
          </div>

          <div className="col-xs-12 col-xl-4 right-col px-0 px-xl-2">
            <LibraryForm setResults={setResults} />
          </div>
        </div>
      </div>
    )
  }
}

export default Library;
