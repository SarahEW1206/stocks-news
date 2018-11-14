import React, { Component } from "react";
// import Selector from "./Selector";

export default class Header extends Component {
  render() {
    // const { setSymbol, symbol } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <h1
          className="display-4 text-center"
          style={{ color: "white", width: "100%" }}
        >
          Stocks & News
        </h1>
        {/* <Selector setSymbol={setSymbol} symbol={symbol} /> */}
      </nav>
    );
  }
}
