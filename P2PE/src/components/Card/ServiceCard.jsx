import React, { Component } from "react";
import { Card2 } from "components/Card/Card";

export class ServiceCard extends Component {
  _renderContent() {
    return (
      <div key={this.props.id}>
        {" "}
        <Card2
          title={this.props.title}
          category={this.props.categoryName}
          bottomRight={this.props.categoryName}
          topRight={this.props.prix}
          content={<div>{this.props.description}</div>}
        />{" "}
      </div>
    );
  }
  render() {
    return this._renderContent();
  }
}

export default ServiceCard;
