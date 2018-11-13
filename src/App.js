import React, { Component } from "react";
import Header from "./components/Header";
import Display from "./components/Display";
import News from "./components/News";
// import axios from "axios";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    symbol: "A"
  };

  setSymbol = value => {
    this.setState({ symbol: value });
  };

  render() {
    return (
      <div className="App">
        <Header symbol={this.state.symbol} setSymbol={this.setSymbol} />
        <div className="container">
          <Display symbol={this.state.symbol} />
          <News />
        </div>
      </div>
    );
  }
}

export default App;
