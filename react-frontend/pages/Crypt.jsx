import React from "react";
import CryptForm from "./components/CryptForm.jsx";
import CryptResults from "./components/CryptResults.jsx";

class Crypt extends React.Component {
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
            <CryptResults cards={this.state.cards}/>
          </div>

          <div className="col-xs-12 col-xl-4 right-col px-0 px-xl-2">
            <CryptForm setResults={setResults} />
          </div>
        </div>
      </div>
    )
  }
}

export default Crypt;
