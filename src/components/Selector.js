import React, { Component } from "react";

export default class Selector extends Component {
  state = {
    selected: "",
    entered: ""
  };

  render() {
    const { setSymbol } = this.props;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          setSymbol(this.state.entered.toLowerCase());
          this.setState({
            entered: ""
          });
        }}
      >
        <div className="input-group mb-3">
          <input
            className="form-control"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            type="text"
            placeholder="Enter a Symbol"
            value={this.state.entered}
            onChange={e => {
              this.setState({
                entered: e.target.value
              });
            }}
          />
          <div className="input-group-append" />
          <button
            className="btn btn-secondary"
            type="button"
            onClick={e => {
              e.preventDefault();
              setSymbol(this.state.entered.toLowerCase());
              this.setState({
                entered: ""
              });
            }}
          >
            ENTER
          </button>
        </div>
      </form>
    );
  }
}
