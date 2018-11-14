import React, { Component } from "react";
import axios from "axios";

export default class Display extends Component {
  state = {
    stock: "",
    color: "",
    openColor: "",
    openLabel: "Open:",
    news: ""
  };

  getData() {
    const { symbol } = this.props;
    const { companyName } = this.state.stock;
    axios
      .get(`https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote`)
      .then(res => {
        this.setState({ stock: res.data.quote, openLabel: "Open:" });
        return axios.get(
          `https://newsapi.org/v2/everything?q=${companyName}&apiKey=233e1387d9d94f85bfcdb577165f851a`
        );
      })
      .then(res => this.setState({ news: res.data.articles }))
      .catch(() =>
        this.setState({
          stock: {
            symbol: `Sorry no results found for ${symbol}!`
          },
          news: "",
          openLabel: ""
        })
      );

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
    this.interval = setInterval(() => this.getData(), 1000);
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
        <div>
          {this.state.news && (
            <div>
              {this.state.news.map(story => {
                return <h2>{story.title}</h2>;
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}
