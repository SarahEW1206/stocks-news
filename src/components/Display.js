import React, { Component } from "react";
import Selector from "./Selector";
import News from "./News";
import axios from "axios";

export default class Display extends Component {
  state = {
    stock: "",
    color: "",
    openColor: "",
    news: ""
  };

  componentDidMount() {
    this.setState({ stock: { companyName: "Enter a Ticker Symbol Above" } });
  }

  getData(symbol) {
    axios
      .get(
        `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=uO7WwIJwLtXBWj1Jt3iRAFGfXVxHTKVCcsvoMRfQVtMbOJ79X2AZ74zUM5Wf`
      )
      .then(res => {
        this.setState({ stock: res.data, openLabel: "Open:" });
        return axios.get(
          `https://newsapi.org/v2/everything?q=${
            this.state.stock.name
          }&apiKey=233e1387d9d94f85bfcdb577165f851a`
        );
      })
      .then(res => {
        this.setState({ news: res.data.articles });
        if (this.state.stock.price > this.state.stock.price_open) {
          this.setState({ color: "green", openColor: "red" });
        }

        if (this.state.stock.price < this.state.stock.price_open) {
          this.setState({ color: "red", openColor: "green" });
        }

        if (this.state.stock.price === this.state.stock.price_open) {
          this.setState({ color: "black", openColor: "black" });
        }
      })
      .catch(() =>
        this.setState({
          stock: {
            symbol: `Sorry no results found for ${symbol}!`
          },
          news: ""
        })
      );

    console.log("here we go");
  }

  render() {
    return (
      <div>
        <Selector getData={this.getData.bind(this)} />
        <div className="card">
          <div className="card-body">
            <p className="text-center display-4">{this.state.stock.symbol}</p>
            <p className="text-center display-4">{this.state.stock.name}</p>
            <p
              className="text-center display-2"
              style={{ color: this.state.color }}
            >
              {this.state.stock.price}
            </p>
            <p
              className="text-center display-5"
              style={{ color: this.state.openColor }}
            >
              {this.state.stock.price_open && (
                <span className="text-primary">Open: </span>
              )}
              {this.state.stock.price_open}
            </p>
          </div>
        </div>

        {this.state.news && (
          <div className="card">
            <div className="card-body">
              <div>
                {this.state.news.map(story => {
                  return <News story={story} />;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
