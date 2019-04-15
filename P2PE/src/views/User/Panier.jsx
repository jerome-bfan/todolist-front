import React, { Component } from "react";

 class Panier extends Component {
  constructor(props) {
    super(props);
    this._renderPage = this._renderPage.bind(this);
  }

  _renderPage() {
    return <div className="content">Panier</div>;
  }

  componentWillMount() {
  }
  render() {
    return this._renderPage();
  }
}
export default Panier;
