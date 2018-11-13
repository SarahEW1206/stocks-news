import React, { Component } from "react";
import axios from "axios";

export default class News extends Component {
  state = {
    news: ""
  };

  async getNews() {
    const { name } = this.props;
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=${name}&apiKey=233e1387d9d94f85bfcdb577165f851a`
      );
      this.setState({ news: res.data.articles });
    } catch (error) {
      console.log(error);
      this.setState({ news: "" });
    }
  }

  componentDidMount() {
    this.getNews();
  }

  render() {
    console.log(this.state.news);
    return (
      <div>
        {this.state.news && (
          <div>
            {this.state.news.map(story => {
              return <h2>{story.title}</h2>;
            })}
          </div>
        )}
      </div>
    );
  }
}
