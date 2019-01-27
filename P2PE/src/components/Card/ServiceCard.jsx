import React, { Component } from "react";
import { Card2 } from "components/Card/Card";
import Button from "components/CustomButton/CustomButton.jsx";

export class ServiceCard extends Component {
  _renderButtonValidate = () => {
    return (
      <Button style={{ marginTop: 15 }} onClick={e => {}}>
        RESERVEZ
      </Button>
    );
  };
  _renderContent() {
    return (
      <div key={this.props.id}>
        {" "}
        <Card2
          title={this.props.title}
          category={
            <div>
              {this.props.categoryName} ({this.props.location})
            </div>
          }
          bottomRight={<div>{this._renderButtonValidate()}</div>}
          topRight={
            <div style={{ marginTop: 6 ,fontWeight: "bold", fontSize: 40 }}>
              {this.props.prix}€
            </div>
          }
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
