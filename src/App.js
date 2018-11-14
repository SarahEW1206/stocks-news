import React, { Component } from "react";
import Header from "./components/Header";
import Display from "./components/Display";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Display />
        </div>
      </div>
    );
  }
}

export default App;
