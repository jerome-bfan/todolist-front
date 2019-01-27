import React, { Component } from "react";
import { Card } from "components/Card/Card";

export class ServiceCard extends Component {
  _renderContent() {
    return (
      <div key={this.props.id}>
        {" "}
        <Card
          title={this.props.title}
          category={this.props.categoryName}
          content={<div>{this.props.description}</div>}
        />{" "}
      </div>
    );
  }
  render() {
    return this._renderContent();
  }
}

export default Card;
