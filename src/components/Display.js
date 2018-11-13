import React, { Component } from "react";
import axios from "axios";

export default class Display extends Component {
  state = {
    stock: "",
    color: "",
    openColor: "",
    openLabel: "Open:"
  };

  async getPrice() {
    const { symbol } = this.props;
    try {
      const res = await axios.get(
        `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote`
      );
      this.setState({ stock: res.data.quote });
    } catch (error) {
      console.log(error);
      this.setState({
        stock: {
          symbol: `Sorry no results found for ${symbol}!`
        },
        openLabel: ""
      });
    }

    if (this.state.stock.latestPrice > this.state.stock.open) {
      this.setState({ color: "green", openColor: "red" });
    }

    if (this.state.stock.latestPrice < this.state.stock.open) {
      this.setState({ color: "red", openColor: "green" });
    }

    if (this.state.stock.latestPrice === this.state.stock.open) {
      this.setState({ color: "black", openColor: "black" });
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.getPrice(), 1000);
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <p className="text-center display-4">{this.state.stock.symbol}</p>
          <p className="text-center display-4">
            {this.state.stock.companyName}
          </p>
          <p
            className="text-center display-2"
            style={{ color: this.state.color }}
          >
            {this.state.stock.latestPrice}
          </p>
          <p
            className="text-center display-5"
            style={{ color: this.state.openColor }}
          >
            <span className="text-primary">{this.state.openLabel}</span>
            {this.state.stock.open}
          </p>
        </div>
      </div>
    );
  }
}
