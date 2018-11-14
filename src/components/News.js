import React, { Component } from "react";

export default class News extends Component {
  render() {
    const { source, author, title, url, urlToImage } = this.props.story;
    return (
      <div>
        <img className="story-image" src={urlToImage} />
        <a href={url} target="_blank">
          <h4>{title}</h4>
        </a>
        <p>Author: {author}</p>
        {source.id && <p>Source: {source.id}</p>}
      </div>
    );
  }
}
