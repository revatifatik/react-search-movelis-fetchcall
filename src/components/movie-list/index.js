import React, { Component } from "react";
import "./index.css";

export default class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      dataLoading: true,
      inputString: "",
      data: null
    }
  }
  onInputChange(e) {
    this.setState({ inputString: e.target.value })
  }
  onSearchClick() {
    fetch(`https://jsonmock.hackerrank.com/api/movies?Year=${this.state.inputString}`)
      .then(response => response.json())
      .then(data => this.setState({ data: data.data, dataLoading: false }))
  }
  render() {
    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input type="number" value={this.state.inputString} className="large" placeholder="Enter Year eg 2015" onChange={(e) => this.onInputChange(e)} data-testid="app-input" />
          <button className="" data-testid="submit-button" onClick={() => this.onSearchClick()}>Search</button>
        </section>

        <ul className="mt-50 styled" data-testid="movieList">
          {this.state.data !== null && this.state.data.length > 0 && this.state.data.map((item, index) => {
            return <li key={index} className="slide-up-fade-in py-10">{item.Title}</li>
          })}
        </ul>

        {!this.state.dataLoading && <div className="mt-50 slide-up-fade-in" data-testid="no-result">No Results Found</div>}
      </div>
    );
  }
}
