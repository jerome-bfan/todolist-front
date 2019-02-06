import React, { Component } from "react";
import { Card2 } from "components/Card/Card";
import Button from "components/CustomButton/CustomButton.jsx";
import { Panel } from "react-bootstrap";

export function DispoService({ state }) {
  if (state) {
    return (
      <text style={{ color: "rgb(125, 206, 125)", fontWeight: "bold" }}>
        <i
          style={{
            color: "rgb(125, 206, 125)",
            fontWeight: "bold",
            marginRight: 5
          }}
          className="pe-7s-check"
        />{" "}
        Disponible
      </text>
    );
  } else {
    return (
      <text style={{ color: "rgb(255, 0, 67)", fontWeight: "bold" }}>
        <i
          style={{
            color: "rgb(255, 0, 67)",
            fontWeight: "bold",
            marginRight: 5
          }}
          className="pe-7s-close"
        />{" "}
        Non disponible
      </text>
    );
  }
}
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
          id={this.props.id_service}
          title={this.props.title}
          service={this.props}
          category={
            <div>
              {this.props.categoryName} ({this.props.location})
            </div>
          }
          topRight={
            <div
              style={{
                marginTop: 16,
                paddingLeft: 10,
                fontWeight: "bold",
                fontSize: 40
              }}
            >
              {this.props.prix}€
            </div>
          }
          content={
            <div>
              {" "}
              <Panel
                eventKey="1"
                style={{ cornerRadius: 30, marginRight: 100, marginTop: 30 }}
              >
                <Panel.Heading>
                  <Panel.Title toggle style={{ textAlign: "left" }}>
                    Plus de details
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>{this.props.description}</Panel.Body>
              </Panel>
              <DispoService state={this.props.state} />
            </div>
          }
        />
      </div>
    );
  }
  render() {
    return this._renderContent();
  }
}

export default ServiceCard;
